import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { nearbyStreets } from './extraDestinations'
import type { ExtraDestination, MapFilter } from './extraDestinations'
import type { Destination, Location, WalkingRoute } from './types'

interface Props {
  destinations: Destination[]
  extraDestinations: ExtraDestination[]
  filter: MapFilter
  visited: number[]
  nextId?: number
  location: Location | null
  route: WalkingRoute | null
  centerRequest: number
  focusExtra: { id: string; sequence: number } | null
  onSelect: (id: number) => void
  onSelectExtra: (id: string) => void
}

export function MapView({ destinations, extraDestinations, filter, visited, nextId, location, route, centerRequest, focusExtra, onSelect, onSelectExtra }: Props) {
  const element = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markerLayer = useRef<L.LayerGroup | null>(null)
  const extraLayer = useRef<L.LayerGroup | null>(null)
  const locationLayer = useRef<L.LayerGroup | null>(null)
  const routeLayer = useRef<L.LayerGroup | null>(null)
  const selectRef = useRef(onSelect)
  const selectExtraRef = useRef(onSelectExtra)
  const locationRef = useRef(location)
  selectRef.current = onSelect
  selectExtraRef.current = onSelectExtra
  locationRef.current = location

  useEffect(() => {
    if (!element.current) return
    const map = L.map(element.current, { zoomControl: false, zoomAnimation: false }).setView([52.515, 13.38], 13)
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    routeLayer.current = L.layerGroup().addTo(map)
    markerLayer.current = L.layerGroup().addTo(map)
    extraLayer.current = L.layerGroup().addTo(map)
    locationLayer.current = L.layerGroup().addTo(map)
    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const layer = markerLayer.current
    if (!layer) return
    layer.clearLayers()
    if (filter === 'extra') return
    destinations.forEach(destination => {
      const state = visited.includes(destination.id) ? 'visited' : destination.id === nextId ? 'next' : 'upcoming'
      const marker = L.marker([destination.latitude, destination.longitude], {
        title: `${destination.id}. ${destination.name}`,
        icon: L.divIcon({
          className: 'marker-wrapper',
          html: `<span class="destination-marker ${state}">${destination.id}</span>`,
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        }),
      })
      marker.on('click', () => selectRef.current(destination.id))
      marker.addTo(layer)
    })
  }, [destinations, visited, nextId, filter])

  useEffect(() => {
    const layer = extraLayer.current
    const map = mapRef.current
    if (!layer || !map) return
    layer.clearLayers()
    if (filter === 'tour') return
    extraDestinations.forEach(destination => {
      const marker = L.marker([destination.latitude, destination.longitude], {
        title: destination.name,
        icon: L.divIcon({
          className: 'marker-wrapper',
          html: '<span class="extra-marker" aria-hidden="true">✦</span>',
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        }),
      })
      marker.on('click', () => selectExtraRef.current(destination.id))
      marker.addTo(layer)
    })
    const streets = nearbyStreets.map(street => {
      const line = L.polyline(street.coordinates, { color: '#765494', weight: 5, opacity: 0.9 })
        .bindTooltip(street.name, { permanent: true, direction: 'top', className: 'street-label' })
        .on('click', () => selectExtraRef.current('eberswalder'))
        .addTo(layer)
      return line
    })
    const updateStreetLabels = () => streets.forEach(line => {
      line.getTooltip()?.getElement()?.classList.toggle('street-label-hidden', map.getZoom() < 15)
    })
    updateStreetLabels()
    map.on('zoomend', updateStreetLabels)
    return () => { map.off('zoomend', updateStreetLabels) }
  }, [extraDestinations, filter])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const visible = [
      ...(filter === 'extra' ? [] : destinations),
      ...(filter === 'tour' ? [] : extraDestinations),
    ]
    if (visible.length) {
      map.fitBounds(L.latLngBounds(visible.map(point => [point.latitude, point.longitude])), {
        paddingTopLeft: [28, 155], paddingBottomRight: [28, 160], animate: false,
      })
    }
  }, [destinations, extraDestinations, filter])

  useEffect(() => {
    const layer = routeLayer.current
    if (!layer) return
    layer.clearLayers()
    if (route) {
      const line = L.polyline(route.coordinates, { color: '#264c50', weight: 5, opacity: 0.8 }).addTo(layer)
      if (filter === 'tour') mapRef.current?.fitBounds(line.getBounds(), {
        paddingTopLeft: [28, 155], paddingBottomRight: [28, 160], animate: false,
      })
    }
  }, [route, filter])

  useEffect(() => {
    const layer = locationLayer.current
    if (!layer) return
    layer.clearLayers()
    if (location) {
      L.circle([location.latitude, location.longitude], {
        radius: location.accuracy, color: '#2580c3', weight: 1, fillOpacity: 0.09, interactive: false,
      }).addTo(layer)
      L.circleMarker([location.latitude, location.longitude], {
        radius: 8, color: '#fff', weight: 3, fillColor: '#1879c1', fillOpacity: 1, interactive: false,
      }).addTo(layer)
    }
  }, [location])

  useEffect(() => {
    const current = locationRef.current
    if (centerRequest && current) mapRef.current?.setView([current.latitude, current.longitude], 16, { animate: false })
  }, [centerRequest])

  useEffect(() => {
    const destination = extraDestinations.find(item => item.id === focusExtra?.id)
    if (destination) mapRef.current?.setView([destination.latitude, destination.longitude], 16, { animate: false })
  }, [extraDestinations, focusExtra])

  return <div ref={element} className="map" aria-label="Berliinin kävelyreitin kartta" />
}
