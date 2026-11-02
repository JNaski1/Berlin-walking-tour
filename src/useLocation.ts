import { useEffect, useState } from 'react'
import type { Location } from './types'

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!window.isSecureContext) {
      setError('Sijainti vaatii HTTPS-yhteyden tai localhost-osoitteen.')
      return
    }
    if (!navigator.geolocation) {
      setError('Selaimesi ei tue paikannusta.')
      return
    }
    const watch = navigator.geolocation.watchPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        })
        setError(null)
      },
      positionError => {
        setLocation(null)
        setError(positionError.code === 1
          ? 'Sijaintilupa evättiin. Salli sijainti selaimen asetuksissa ja lataa sivu uudelleen.'
          : 'Sijaintia ei saada juuri nyt. Tarkista GPS ja verkkoyhteys.')
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 20_000 },
    )
    return () => navigator.geolocation.clearWatch(watch)
  }, [])

  return { location, locationError: error }
}
