export interface Destination {
  id: number
  name: string
  shortName: string
  latitude: number
  longitude: number
  history: string[]
  today: string
  fact: string
  sources: { label: string; url: string }[]
}

export interface Location {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
}

export type RouteMode = 'original' | 'optimized'

export interface WalkingRoute {
  coordinates: [number, number][]
  distance: number
  duration: number
}
