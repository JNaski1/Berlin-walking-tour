import type { Destination, WalkingRoute } from './types'

const SERVICE = 'https://routing.openstreetmap.de/routed-foot'
const points = (destinations: Destination[]) => destinations.map(d => `${d.longitude},${d.latitude}`).join(';')

function assertNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error('Reitityspalvelu palautti virheelliset tiedot.')
}

async function request(path: string, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(`${SERVICE}/${path}`, { signal })
  if (!response.ok) throw new Error(`Reitityspalvelu vastasi virheellä ${response.status}.`)
  return response.json()
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Reitityspalvelu palautti virheelliset tiedot.')
  return value as Record<string, unknown>
}

export async function fetchRoute(destinations: Destination[], signal: AbortSignal): Promise<WalkingRoute> {
  const data = record(await request(`route/v1/driving/${points(destinations)}?overview=full&geometries=geojson&steps=false`, signal))
  if (data.code !== 'Ok' || !Array.isArray(data.routes) || !data.routes.length) throw new Error('Kävelyreittiä ei löytynyt.')
  const route = record(data.routes[0])
  const geometry = record(route.geometry)
  assertNumber(route.distance)
  assertNumber(route.duration)
  if (geometry.type !== 'LineString' || !Array.isArray(geometry.coordinates)) throw new Error('Reitin geometria on virheellinen.')
  const coordinates: [number, number][] = geometry.coordinates.map((point: unknown) => {
    if (!Array.isArray(point) || point.length < 2) throw new Error('Reitin koordinaatti on virheellinen.')
    assertNumber(point[0])
    assertNumber(point[1])
    return [point[1], point[0]]
  })
  if (coordinates.length < 2) throw new Error('Reitin geometria on tyhjä.')
  return { coordinates, distance: route.distance, duration: route.duration }
}

// Keep the first stop fixed; use walking distances and improve a nearest-neighbour tour.
export function optimizeOrder(matrix: number[][]): number[] {
  const count = matrix.length
  if (!count || matrix.some(row => row.length !== count || row.some(value => !Number.isFinite(value) || value < 0))) {
    throw new Error('Kävelyetäisyyksiä ei voitu laskea kaikkien kohteiden välille.')
  }
  const remaining = new Set(Array.from({ length: count - 1 }, (_, index) => index + 1))
  let order = [0]
  while (remaining.size) {
    const last = order[order.length - 1]
    let best = -1
    for (const candidate of remaining) {
      if (best === -1 || matrix[last][candidate] < matrix[last][best]) best = candidate
    }
    order.push(best)
    remaining.delete(best)
  }
  const length = (tour: number[]) => tour.slice(1).reduce((sum, current, index) => sum + matrix[tour[index]][current], 0)
  const original = Array.from({ length: count }, (_, index) => index)
  if (length(original) < length(order)) order = original
  let improved = true
  while (improved) {
    improved = false
    const currentLength = length(order)
    outer: for (let start = 1; start < count - 1; start++) {
      for (let end = start + 1; end < count; end++) {
        const candidate = [...order.slice(0, start), ...order.slice(start, end + 1).reverse(), ...order.slice(end + 1)]
        if (length(candidate) + 0.01 < currentLength) {
          order.splice(0, count, ...candidate)
          improved = true
          break outer
        }
      }
    }
  }
  return order
}

export async function fetchOptimizedOrder(destinations: Destination[], signal: AbortSignal): Promise<Destination[]> {
  const data = record(await request(`table/v1/driving/${points(destinations)}?annotations=distance`, signal))
  if (data.code !== 'Ok' || !Array.isArray(data.distances) || data.distances.length !== destinations.length) {
    throw new Error('Kävelyetäisyyksiä ei voitu hakea.')
  }
  const matrix: number[][] = data.distances.map((row: unknown) => {
    if (!Array.isArray(row)) throw new Error('Kävelyetäisyyksien muoto on virheellinen.')
    return row.map((value: unknown) => {
      assertNumber(value)
      return value
    })
  })
  return optimizeOrder(matrix).map(index => destinations[index])
}
