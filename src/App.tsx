import { useCallback, useEffect, useRef, useState } from 'react'
import { destinations } from './destinations'
import { extraDestinations } from './extraDestinations'
import type { MapFilter } from './extraDestinations'
import { distanceMetres, formatDistance } from './geo'
import { MapView } from './Map'
import { fetchOptimizedOrder, fetchRoute } from './routing'
import { readProgress, writeProgress } from './storage'
import type { Destination, RouteMode, WalkingRoute } from './types'
import { useLocation } from './useLocation'
import { detectVisits } from './visits'
import type { VisitObservation } from './visits'

const ids = destinations.map(destination => destination.id)

function initialProgress(): { visited: number[]; error: string | null } {
  try {
    const result = readProgress(window.localStorage, ids)
    return {
      visited: result.visited,
      error: result.migrationFailed ? 'Vanha edistyminen luettiin, mutta sitä ei voitu tallentaa uuteen muotoon.' : null,
    }
  } catch {
    return { visited: [], error: 'Tallennettua edistymistä ei voitu lukea. Tarkista selaimen tallennusasetukset.' }
  }
}

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : 'Tuntematon virhe.'
}

function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60)
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`
}

export default function App() {
  const [initial] = useState(initialProgress)
  const [visited, setVisited] = useState(initial.visited)
  const visitedRef = useRef(visited)
  const [storageError, setStorageError] = useState(initial.error)
  const [notice, setNotice] = useState('')
  const [mode, setMode] = useState<RouteMode>('original')
  const [optimized, setOptimized] = useState<Destination[] | null>(null)
  const [optimizationError, setOptimizationError] = useState<string | null>(null)
  const [route, setRoute] = useState<WalkingRoute | null>(null)
  const [routeError, setRouteError] = useState<string | null>(null)
  const [routeLoading, setRouteLoading] = useState(true)
  const [routeAttempt, setRouteAttempt] = useState(0)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedExtraId, setSelectedExtraId] = useState<string | null>(null)
  const [mapFilter, setMapFilter] = useState<MapFilter>('tour')
  const [focusExtra, setFocusExtra] = useState<{ id: string; sequence: number } | null>(null)
  const [centerRequest, setCenterRequest] = useState(0)
  const enteredAt = useRef(new Map<number, VisitObservation>())
  const { location, locationError } = useLocation()
  const order = mode === 'original' ? destinations : optimized
  const next = order?.find(destination => !visited.includes(destination.id))
  const selected = destinations.find(destination => destination.id === selectedId)
  const selectedExtra = extraDestinations.find(destination => destination.id === selectedExtraId)
  const percentage = Math.round(visited.length / destinations.length * 100)

  const updateVisited = useCallback((newVisited: number[], message: string) => {
    visitedRef.current = newVisited
    setVisited(newVisited)
    setNotice(message)
    try {
      writeProgress(window.localStorage, newVisited)
      setStorageError(null)
    } catch {
      setStorageError('Edistymistä ei voitu tallentaa. Muutokset ovat käytössä vain tällä sivukäynnillä.')
    }
  }, [])

  useEffect(() => {
    if (mode !== 'optimized') return
    const controller = new AbortController()
    setOptimized(null)
    setOptimizationError(null)
    fetchOptimizedOrder(destinations, controller.signal).then(setOptimized).catch(error => {
      if (!controller.signal.aborted) setOptimizationError(errorText(error))
    })
    return () => controller.abort()
  }, [mode, routeAttempt])

  useEffect(() => {
    const controller = new AbortController()
    setRoute(null)
    setRouteError(null)
    if (!order) {
      setRouteLoading(false)
      return () => controller.abort()
    }
    setRouteLoading(true)
    fetchRoute(order, controller.signal).then(setRoute).catch(error => {
      if (!controller.signal.aborted) setRouteError(errorText(error))
    }).finally(() => {
      if (!controller.signal.aborted) setRouteLoading(false)
    })
    return () => controller.abort()
  }, [order, routeAttempt])

  useEffect(() => {
    if (!location) {
      enteredAt.current.clear()
      return
    }
    const arrivals = detectVisits(destinations, visitedRef.current, enteredAt.current, location, Date.now())
    if (arrivals.length) {
      const names = arrivals.map(id => destinations[id - 1].shortName).join(', ')
      updateVisited([...visitedRef.current, ...arrivals], `Merkitty käydyksi: ${names}.`)
    }
  }, [location, updateVisited])

  function toggleVisited(destination: Destination) {
    const isVisited = visitedRef.current.includes(destination.id)
    enteredAt.current.delete(destination.id)
    updateVisited(
      isVisited ? visitedRef.current.filter(id => id !== destination.id) : [...visitedRef.current, destination.id],
      isVisited ? `Käyntimerkintä poistettu: ${destination.shortName}.` : `Merkitty käydyksi: ${destination.shortName}.`,
    )
  }

  function resetProgress() {
    if (!window.confirm('Poistetaanko kaikki käyntimerkinnät?')) return
    enteredAt.current.clear()
    updateVisited([], 'Edistyminen on nollattu.')
  }

  function continueToNext() {
    if (!order || !selected) {
      setSelectedId(null)
      return
    }
    const index = order.findIndex(destination => destination.id === selected.id)
    const remaining = [...order.slice(index + 1), ...order.slice(0, index)]
    setSelectedId(remaining.find(destination => !visited.includes(destination.id))?.id ?? null)
  }

  function selectTour(id: number) {
    setSelectedExtraId(null)
    setSelectedId(id)
  }

  function selectExtra(id: string, focus = false) {
    setSelectedId(null)
    setSelectedExtraId(id)
    if (focus) setFocusExtra(previous => ({ id, sequence: (previous?.sequence ?? 0) + 1 }))
  }

  function changeFilter(value: string) {
    if (value !== 'tour' && value !== 'extra' && value !== 'all') throw new Error('Tuntematon karttasuodatin.')
    setMapFilter(value)
    if (value === 'tour') setSelectedExtraId(null)
    if (value === 'extra') setSelectedId(null)
  }

  return (
    <div className={`app${selected || selectedExtra ? ' panel-open' : ''}`}>
      <header className="header">
        <div className="heading-row">
          <div><p className="eyebrow">KAUPUNKIKÄVELY</p><h1>Hildan kohteet Berliiniin</h1></div>
          <div className="progress-count"><strong>{visited.length}<span> / {destinations.length}</span></strong><small>{percentage} % käyty</small></div>
        </div>
        <div className="progress-track" role="progressbar" aria-label="Käyntien edistyminen" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
          <div style={{ width: `${percentage}%` }} />
        </div>
        <div className="next-row">
          <div>
            <span className="subtle">{next ? 'SEURAAVAKSI' : order ? 'REITTI VALMIS' : 'JÄRJESTYSTÄ HAETAAN'}</span>
            <strong>{next?.shortName ?? (order ? 'Kaikki kohteet käyty' : 'Odota hetki')}</strong>
            {next && location && <small>{formatDistance(distanceMetres(location, next))} linnuntietä</small>}
          </div>
          {next && <button className="text-button" onClick={() => selectTour(next.id)}>Näytä →</button>}
        </div>
      </header>

      <main className="map-area">
        <MapView destinations={destinations} extraDestinations={extraDestinations} filter={mapFilter} visited={visited} nextId={next?.id} location={location} route={route} centerRequest={centerRequest} focusExtra={focusExtra} onSelect={selectTour} onSelectExtra={selectExtra} />
        <button className="locate-button" onClick={() => setCenterRequest(value => value + 1)} disabled={!location} aria-label="Keskitä kartta sijaintiini" title="Keskitä sijaintiini">⌖</button>
        <div className="map-status">
          {location ? `GPS ±${Math.round(location.accuracy)} m` : locationError ? 'GPS ei käytettävissä' : 'Haetaan sijaintia…'}
        </div>
        {(locationError || storageError || routeError || optimizationError) && (
          <div className="map-error" role="alert">
            {storageError || locationError || `Reititys epäonnistui: ${optimizationError || routeError} Avaa kohdelista yrittääksesi uudelleen.`}
          </div>
        )}
        <div className="drawer">
          <div className="map-filter">
            <label htmlFor="map-filter">Kartalla</label>
            <select id="map-filter" value={mapFilter} onChange={event => changeFilter(event.target.value)}>
              <option value="tour">Kävelykierroksen kohteet</option>
              <option value="extra">Kävelykierroksen ulkopuoliset kohteet</option>
              <option value="all">Kaikki kohteet</option>
            </select>
          </div>
          <details>
          <summary><span>Kohteet ja reitti</span><span>{visited.length} / {destinations.length} <span aria-hidden="true">⌃</span></span></summary>
          <div className="drawer-content">
            {mapFilter !== 'tour' && <>
              <h2 className="list-heading">Kävelykierroksen ulkopuolisia kohteita</h2>
              <ul className="destination-list extra-list">
                {extraDestinations.map(destination => (
                  <li key={destination.id}>
                    <button onClick={() => selectExtra(destination.id, true)}>
                      <span className="extra-list-icon" aria-hidden="true">✦</span>
                      <span className="list-name">{destination.name}</span>
                      <span className="list-state">›</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>}
            <h2 className="list-heading">Kävelykierroksen kohteet</h2>
            <label htmlFor="route-mode">Reittijärjestys</label>
            <select id="route-mode" value={mode} onChange={event => setMode(event.target.value as RouteMode)}>
              <option value="original">Alkuperäinen järjestys</option>
              <option value="optimized">Optimoitu kävelyjärjestys</option>
            </select>
            {mode === 'optimized' && <p className="help">Arvioitu lyhyempi järjestys kävelyetäisyyksien perusteella. Lähtö on Hauptbahnhof; maailmanlaajuisesti lyhintä reittiä ei taata.</p>}
            <p className="route-summary">
              {routeLoading ? 'Haetaan kävelyreittiä…' : route ? `${formatDistance(route.distance)} · noin ${formatDuration(route.duration)} kävelyä` : !optimizationError && !routeError ? 'Reittiä valmistellaan…' : 'Reitti ei ole saatavilla.'}
            </p>
            {(routeError || optimizationError) && <div className="warning" role="alert">Reititys epäonnistui: {optimizationError || routeError} <button className="text-button" onClick={() => setRouteAttempt(value => value + 1)}>Yritä uudelleen</button></div>}
            {locationError && <p className="warning">{locationError}</p>}
            {storageError && <p className="warning" role="alert">{storageError}</p>}
            <ol className="destination-list">
              {(order ?? destinations).map(destination => (
                <li key={destination.id}>
                  <button onClick={() => selectTour(destination.id)}>
                    <span className={`list-number ${visited.includes(destination.id) ? 'done' : destination.id === next?.id ? 'active' : ''}`}>{destination.id}</span>
                    <span className="list-name">{destination.shortName}</span>
                    <span className="list-state">{visited.includes(destination.id) ? '✓ Käyty' : destination.id === next?.id ? 'Seuraava' : '›'}</span>
                  </button>
                </li>
              ))}
            </ol>
            <button className="reset-button" onClick={resetProgress}>Nollaa edistyminen</button>
          </div>
          </details>
        </div>
      </main>
      {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Sulje ilmoitus">×</button></div>}
      {selected && (
        <div className="panel-backdrop">
          <section className="panel" role="dialog" aria-labelledby="panel-title">
            <div className="panel-header">
              <span className="panel-number">{selected.id} / {destinations.length}</span>
              <button className="close-button" onClick={() => setSelectedId(null)} aria-label="Sulje kohdetiedot">×</button>
            </div>
            <div className="panel-body">
              <h2 id="panel-title">{selected.name}</h2>
              {selected.history.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              <h3>Täällä tänään</h3><p>{selected.today}</p>
              <h3>Tiesitkö?</h3><p>{selected.fact}</p>
              <h3>Lähteet</h3>
              <p className="sources">{selected.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</p>
              <a className="directions" href={`https://www.google.com/maps/dir/?api=1&destination=${selected.latitude}%2C${selected.longitude}&travelmode=walking`} target="_blank" rel="noreferrer">Avaa kävelyohje Google Mapsissa ↗</a>
            </div>
            <div className="panel-actions">
              <button className="primary-button" onClick={() => toggleVisited(selected)}>{visited.includes(selected.id) ? 'Poista käyntimerkintä' : 'Merkitse käydyksi'}</button>
              <button className="secondary-button" onClick={continueToNext}>Jatka seuraavaan →</button>
            </div>
          </section>
        </div>
      )}
      {selectedExtra && (
        <div className="panel-backdrop">
          <section className="panel extra-panel" role="dialog" aria-labelledby="extra-panel-title">
            <div className="panel-header">
              <span className="panel-number">KÄVELYKIERROKSEN ULKOPUOLINEN KOHDE</span>
              <button className="close-button" onClick={() => setSelectedExtraId(null)} aria-label="Sulje kohdetiedot">×</button>
            </div>
            <div className="panel-body">
              <h2 id="extra-panel-title">{selectedExtra.name}</h2>
              <p>{selectedExtra.description}</p>
              {selectedExtra.address && <p><strong>Osoite:</strong> {selectedExtra.address}</p>}
              {selectedExtra.note && <p className="extra-note">{selectedExtra.note}</p>}
              <p className="sources"><a href={selectedExtra.sourceUrl} target="_blank" rel="noreferrer">{selectedExtra.sourceLabel} ↗</a></p>
              <a className="directions" href={`https://www.google.com/maps/dir/?api=1&destination=${selectedExtra.latitude}%2C${selectedExtra.longitude}&travelmode=walking`} target="_blank" rel="noreferrer">Avaa kävelyohje Google Mapsissa ↗</a>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
