import { distanceMetres } from './geo'
import type { Destination, Location } from './types'

export const VISIT_RADIUS_METRES = 50
export const VISIT_DWELL_MS = 10_000
export const MAX_LOCATION_AGE_MS = 30_000

export interface VisitObservation {
  start: number
  last: number
  lastFix: number
}

export function detectVisits(
  destinations: Destination[],
  visited: number[],
  enteredAt: Map<number, VisitObservation>,
  location: Location,
  now: number,
): number[] {
  const arrived: number[] = []
  for (const destination of destinations) {
    if (visited.includes(destination.id)) {
      enteredAt.delete(destination.id)
      continue
    }
    const reliable = Number.isFinite(location.accuracy) && location.accuracy >= 0 &&
      now - location.timestamp >= 0 && now - location.timestamp <= MAX_LOCATION_AGE_MS &&
      distanceMetres(location, destination) + location.accuracy <= VISIT_RADIUS_METRES
    if (!reliable) {
      enteredAt.delete(destination.id)
      continue
    }
    const observation = enteredAt.get(destination.id)
    if (!observation || now - observation.last > MAX_LOCATION_AGE_MS || now < observation.last ||
      location.timestamp < observation.lastFix) {
      enteredAt.set(destination.id, { start: now, last: now, lastFix: location.timestamp })
    } else if (location.timestamp === observation.lastFix) {
      continue
    } else if (now - observation.start >= VISIT_DWELL_MS) {
      arrived.push(destination.id)
      enteredAt.delete(destination.id)
    } else {
      observation.last = now
      observation.lastFix = location.timestamp
    }
  }
  return arrived
}
