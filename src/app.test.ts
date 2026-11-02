import { describe, expect, it, vi, afterEach } from 'vitest'
import { destinations } from './destinations'
import { extraDestinations, nearbyStreets } from './extraDestinations'
import { distanceMetres } from './geo'
import { fetchOptimizedOrder, fetchRoute, optimizeOrder } from './routing'
import { LEGACY_STORAGE_KEY, readProgress, STORAGE_KEY, writeProgress } from './storage'
import { detectVisits, MAX_LOCATION_AGE_MS, VISIT_DWELL_MS, VISIT_RADIUS_METRES } from './visits'
import type { VisitObservation } from './visits'

class MemoryStorage implements Storage {
  private values = new Map<string, string>()
  get length() { return this.values.size }
  clear() { this.values.clear() }
  getItem(key: string) { return this.values.get(key) ?? null }
  key(index: number) { return [...this.values.keys()][index] ?? null }
  removeItem(key: string) { this.values.delete(key) }
  setItem(key: string, value: string) { this.values.set(key, value) }
}

describe('destinations and route order', () => {
  it('contains the 21 remaining destinations in their original order', () => {
    expect(destinations.map(d => d.shortName)).toEqual([
      'Hauptbahnhof', 'Bundeskanzleramt', 'Paul-Löbe-Haus', 'Reichstag',
      'Sowjetisches Ehrenmal', 'Brandenburger Tor', 'Holokaustin muistomerkki', 'Führerbunker',
      'Potsdamer Platz', 'Detlev-Rohwedder-Haus', 'Berliinin muuri', 'Topographie des Terrors',
      'Checkpoint Charlie', 'Gendarmenmarkt', 'Bebelplatz', 'Neue Wache', 'Museumsinsel',
      'Berliner Dom', 'Marx-Engels-Forum', 'Alexanderplatz', 'Fernsehturm',
    ])
    expect(destinations.map(d => d.id)).toEqual(Array.from({ length: 21 }, (_, i) => i + 1))
    for (const destination of destinations) {
      expect(destination.latitude).toBeGreaterThan(52.4)
      expect(destination.latitude).toBeLessThan(52.6)
      expect(destination.longitude).toBeGreaterThan(13.3)
      expect(destination.longitude).toBeLessThan(13.5)
      expect(destination.history.length).toBeGreaterThanOrEqual(3)
      expect([...destination.history, destination.today, destination.fact].join(' ').split(/\s+/).length).toBeGreaterThanOrEqual(110)
      expect(destination.today && destination.fact && destination.sources.length >= 2).toBeTruthy()
    }
    expect(distanceMetres(destinations[4], destinations[5])).toBeLessThan(600)
    expect(destinations.some(d => d.name === 'Siegessäule')).toBe(false)
  })

  it('keeps the verified tour coordinates attached to the right destinations', () => {
    expect(destinations.map(d => [d.latitude, d.longitude])).toEqual([
      [52.5250175, 13.3694480], [52.5201946, 13.3691292], [52.5201476, 13.3748004],
      [52.5186538, 13.3761015], [52.5166949, 13.3719190], [52.5162699, 13.3777034],
      [52.5138731, 13.3787346], [52.5124742, 13.3809333], [52.5098014, 13.3755898],
      [52.5086330, 13.3835559], [52.5073563, 13.3853662], [52.5062137, 13.3841548],
      [52.5074321, 13.3903814], [52.5135698, 13.3922970], [52.5164872, 13.3938262],
      [52.5179046, 13.3955371], [52.5180166, 13.3993794], [52.5190822, 13.4010942],
      [52.5185014, 13.4047672], [52.5219814, 13.4136358], [52.5208279, 13.4094214],
    ])
  })

  it('keeps the first stop and visits every stop using a no-longer order', () => {
    const matrix = [[0, 9, 1, 8], [9, 0, 7, 1], [1, 7, 0, 2], [8, 1, 2, 0]]
    const order = optimizeOrder(matrix)
    const length = (route: number[]) => route.slice(1).reduce((sum, point, index) => sum + matrix[route[index]][point], 0)
    expect(order[0]).toBe(0)
    expect([...order].sort()).toEqual([0, 1, 2, 3])
    expect(length(order)).toBeLessThan(length([0, 1, 2, 3]))
    expect(optimizeOrder([[0, 1, 10], [1, 0, 1], [10, 1, 0]])).toEqual([0, 1, 2])
    expect(() => optimizeOrder([[0, Infinity], [1, 0]])).toThrow()
  })

  afterEach(() => vi.unstubAllGlobals())

  it('sends the chosen order to the walking service and reads its geometry', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true, json: async () => ({ code: 'Ok', routes: [{ distance: 100, duration: 80, geometry: { type: 'LineString', coordinates: [[13.1, 52.1], [13.2, 52.2]] } }] }),
    })
    vi.stubGlobal('fetch', fetchMock)
    const chosen = [destinations[1], destinations[0]]
    const route = await fetchRoute(chosen, new AbortController().signal)
    expect(fetchMock.mock.calls[0][0]).toContain(`${chosen[0].longitude},${chosen[0].latitude};${chosen[1].longitude},${chosen[1].latitude}`)
    expect(fetchMock.mock.calls[0][0]).toContain('routed-foot/route/')
    expect(route).toEqual({ distance: 100, duration: 80, coordinates: [[52.1, 13.1], [52.2, 13.2]] })
  })

  it('optimizes all 21 tour stops without introducing the extra destination', async () => {
    const position = (index: number) => index === 2 ? 3 : index === 3 ? 2 : index
    const matrix = destinations.map((_, i) => destinations.map((_, j) => Math.abs(position(i) - position(j)) * 100))
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ code: 'Ok', distances: matrix }) })
      .mockResolvedValueOnce({
        ok: true, json: async () => ({ code: 'Ok', routes: [{ distance: 2000, duration: 1600, geometry: { type: 'LineString', coordinates: [[13.1, 52.1], [13.2, 52.2]] } }] }),
      })
    vi.stubGlobal('fetch', fetchMock)
    const optimized = await fetchOptimizedOrder(destinations, new AbortController().signal)
    expect(optimized.map(d => d.id)).toEqual([1, 2, 4, 3, ...Array.from({ length: 17 }, (_, i) => i + 5)])
    await fetchRoute(optimized, new AbortController().signal)
    const excluded = extraDestinations.find(d => d.id === 'siegessaeule')!
    for (const [url] of fetchMock.mock.calls) {
      expect(url).not.toContain(`${excluded.longitude},${excluded.latitude}`)
      const points = url.split('/driving/')[1].split('?')[0].split(';')
      expect(points).toHaveLength(21)
    }
  })

  it('does not silently invent a route when the service fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }))
    await expect(fetchRoute(destinations, new AbortController().signal)).rejects.toThrow('503')
    await expect(fetchOptimizedOrder(destinations, new AbortController().signal)).rejects.toThrow('503')
  })
})

describe('additional places', () => {
  it('keeps all 13 unnumbered places separate from the 21 tour destinations', () => {
    expect(extraDestinations.map(d => d.id)).toEqual([
      'siegessaeule',
      'kudamm', 'kadewe', 'freie-universitat', 'olympiastadion', 'east-side-gallery', 'raw',
      'mauerpark-market', 'wall-memorial', 'mustafas', 'eberswalder', 'tempelhofer-feld', 'charlottenburg',
    ])
    expect(new Set(extraDestinations.map(d => d.id)).size).toBe(13)
    for (const destination of extraDestinations) {
      expect(destination.name && destination.description && destination.sourceUrl.startsWith('https://')).toBeTruthy()
      expect(destination.latitude).toBeGreaterThan(52.4)
      expect(destination.latitude).toBeLessThan(52.6)
      expect(destination.longitude).toBeGreaterThan(13.2)
      expect(destination.longitude).toBeLessThan(13.5)
      expect(destination).not.toHaveProperty('history')
    }
    expect(destinations).toHaveLength(21)
    const victoryColumn = extraDestinations.find(d => d.id === 'siegessaeule')
    expect(victoryColumn).toMatchObject({ name: 'Siegessäule', latitude: 52.5145082, longitude: 13.3501108 })
  })

  it('shows Sunday-only market information and the current Mustafa address', () => {
    const market = extraDestinations.find(d => d.id === 'mauerpark-market')
    expect(market?.note).toContain('Kirpputori järjestetään sunnuntaisin')
    expect(market?.note).toContain('10–18')
    expect(market?.sourceUrl).toContain('berlin.de')
    expect(extraDestinations.find(d => d.id === 'mustafas')?.address).toBe('Mehringdamm 33, 10961 Berlin')
    expect(nearbyStreets.map(street => street.name)).toEqual(['Kastanienallee', 'Oderberger Straße'])
  })

  it('keeps the verified coordinates of all additional destinations', () => {
    expect(extraDestinations.map(d => [d.id, d.latitude, d.longitude])).toEqual([
      ['siegessaeule', 52.5145082, 13.3501108], ['kudamm', 52.5012777, 13.3178396],
      ['kadewe', 52.5015753, 13.3410035], ['freie-universitat', 52.4516783, 13.2887411],
      ['olympiastadion', 52.5145846, 13.2398144], ['east-side-gallery', 52.5044542, 13.4408392],
      ['raw', 52.5070127, 13.4543002], ['mauerpark-market', 52.5415157, 13.4023137],
      ['wall-memorial', 52.5375133, 13.3946755], ['mustafas', 52.493485, 13.3885619],
      ['eberswalder', 52.5410403, 13.4114305], ['tempelhofer-feld', 52.4744192, 13.4026007],
      ['charlottenburg', 52.5206424, 13.2927104],
    ])
  })
})

describe('visit detection', () => {
  const destination = destinations[0]
  const fix = (timestamp: number, accuracy = 5, latitude = destination.latitude) => ({
    latitude, longitude: destination.longitude, accuracy, timestamp,
  })
  it('preserves the specified radius, dwell time and freshness thresholds', () => {
    expect(VISIT_RADIUS_METRES).toBe(50)
    expect(VISIT_DWELL_MS).toBe(10_000)
    expect(MAX_LOCATION_AGE_MS).toBe(30_000)
  })
  it('requires at least ten seconds of accurate observations inside the radius', () => {
    const observations = new Map<number, VisitObservation>()
    expect(detectVisits([destination], [], observations, fix(1000), 1000)).toEqual([])
    expect(detectVisits([destination], [], observations, fix(10999), 10999)).toEqual([])
    expect(detectVisits([destination], [], observations, fix(11000), 11000)).toEqual([destination.id])
    expect(detectVisits([destination], [destination.id], observations, fix(22000), 22000)).toEqual([])
  })
  it('resets on poor accuracy, departure, stale fixes and long gaps', () => {
    const observations = new Map<number, VisitObservation>()
    detectVisits([destination], [], observations, fix(1000), 1000)
    expect(detectVisits([destination], [], observations, fix(5000, 51), 5000)).toEqual([])
    expect(observations.size).toBe(0)
    detectVisits([destination], [], observations, fix(6000), 6000)
    detectVisits([destination], [], observations, fix(7000, 5, destination.latitude + 0.001), 7000)
    expect(observations.size).toBe(0)
    detectVisits([destination], [], observations, fix(8000), 8000)
    expect(detectVisits([destination], [], observations, fix(8000), 40001)).toEqual([])
    expect(observations.size).toBe(0)
    detectVisits([destination], [], observations, fix(50000), 50000)
    expect(detectVisits([destination], [], observations, fix(81001), 81001)).toEqual([])
    expect(detectVisits([destination], [], observations, fix(91001), 91001)).toEqual([destination.id])
  })
  it('accounts for the accuracy circle, not just the reported point', () => {
    const observations = new Map<number, VisitObservation>()
    const nearEdge = fix(1000, 20, destination.latitude + 0.00036)
    expect(distanceMetres(nearEdge, destination)).toBeLessThan(50)
    detectVisits([destination], [], observations, nearEdge, 1000)
    expect(observations.size).toBe(0)
  })
  it('does not count a short visit and requires a fresh dwell period after return', () => {
    const observations = new Map<number, VisitObservation>()
    expect(detectVisits([destination], [], observations, fix(1000), 1000)).toEqual([])
    expect(detectVisits([destination], [], observations, fix(9000, 5, destination.latitude + 0.001), 9000)).toEqual([])
    expect(detectVisits([destination], [], observations, fix(12000), 12000)).toEqual([])
    expect(detectVisits([destination], [], observations, fix(21999), 21999)).toEqual([])
    expect(detectVisits([destination], [], observations, fix(22000), 22000)).toEqual([destination.id])
  })
  it('rejects points beyond 50 metres and poor, negative or non-finite accuracy', () => {
    const observations = new Map<number, VisitObservation>()
    const outside = fix(1000, 0, destination.latitude + 0.00046)
    expect(distanceMetres(outside, destination)).toBeGreaterThan(50)
    for (const bad of [outside, fix(2000, 51), fix(3000, -1), fix(4000, Infinity)]) {
      expect(detectVisits([destination], [], observations, bad, bad.timestamp)).toEqual([])
      expect(observations.size).toBe(0)
    }
  })
  it('does not count the same GPS fix twice or duplicate an already visited destination', () => {
    const observations = new Map<number, VisitObservation>()
    detectVisits([destination], [], observations, fix(1000), 1000)
    expect(detectVisits([destination], [], observations, fix(1000), 11000)).toEqual([])
    expect(detectVisits([destination], [], observations, fix(11001), 11001)).toEqual([destination.id])
    expect(detectVisits([destination], [destination.id], observations, fix(22000), 22000)).toEqual([])
    expect(detectVisits([destination], [destination.id], observations, fix(32000), 32000)).toEqual([])
  })
  it('never counts Siegessäule even after an accurate long stay', () => {
    const observations = new Map<number, VisitObservation>()
    const column = extraDestinations.find(d => d.id === 'siegessaeule')!
    const location = { latitude: column.latitude, longitude: column.longitude, accuracy: 5, timestamp: 1000 }
    expect(detectVisits(destinations, [], observations, location, 1000)).toEqual([])
    expect(detectVisits(destinations, [], observations, { ...location, timestamp: 12000 }, 12000)).toEqual([])
  })
})

describe('progress persistence', () => {
  it('persists, restores, unmarks and resets visits', () => {
    const storage = new MemoryStorage()
    writeProgress(storage, [1, 5, 21, 21])
    expect(storage.getItem(STORAGE_KEY)).toBe('[1,5,21]')
    expect(readProgress(storage, destinations.map(d => d.id)).visited).toEqual([1, 5, 21])
    writeProgress(storage, [1, 21])
    expect(readProgress(storage, destinations.map(d => d.id)).visited).toEqual([1, 21])
    writeProgress(storage, [])
    expect(readProgress(storage, destinations.map(d => d.id)).visited).toEqual([])
  })
  it('migrates old visits by location, removes only Siegessäule and preserves the old record', () => {
    const storage = new MemoryStorage()
    storage.setItem(LEGACY_STORAGE_KEY, '[1,4,5,6,6,22]')
    expect(readProgress(storage, destinations.map(d => d.id))).toEqual({ visited: [1, 4, 5, 21], migrationFailed: false })
    expect(storage.getItem(STORAGE_KEY)).toBe('[1,4,5,21]')
    expect(storage.getItem(LEGACY_STORAGE_KEY)).toBe('[1,4,5,6,6,22]')
    writeProgress(storage, [])
    expect(readProgress(storage, destinations.map(d => d.id)).visited).toEqual([])
  })
  it('retains migrated visits in memory and reports a storage write failure', () => {
    class ReadOnlyStorage extends MemoryStorage {
      override setItem(key: string, value: string) {
        if (key === STORAGE_KEY) throw new Error('Storage unavailable')
        super.setItem(key, value)
      }
    }
    const storage = new ReadOnlyStorage()
    storage.setItem(LEGACY_STORAGE_KEY, '[5,6,22]')
    expect(readProgress(storage, destinations.map(d => d.id))).toEqual({ visited: [5, 21], migrationFailed: true })
  })
  it('rejects invalid legacy values without overwriting existing data', () => {
    const storage = new MemoryStorage()
    storage.setItem(LEGACY_STORAGE_KEY, '[23]')
    expect(() => readProgress(storage, destinations.map(d => d.id))).toThrow()
    expect(storage.getItem(STORAGE_KEY)).toBeNull()
    expect(storage.getItem(LEGACY_STORAGE_KEY)).toBe('[23]')
  })
  it('rejects invalid stored data instead of silently treating it as valid', () => {
    const storage = new MemoryStorage()
    storage.setItem(STORAGE_KEY, '[23]')
    expect(() => readProgress(storage, destinations.map(d => d.id))).toThrow()
    storage.setItem(STORAGE_KEY, 'broken')
    expect(() => readProgress(storage, destinations.map(d => d.id))).toThrow()
  })
})
