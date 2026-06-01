import { Box } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { useCoordinates } from "@/contexts/coordinates";

export function Map({ onOpenModal }: { onOpenModal?: () => void }) {
  const { coordinates, setCoordinates } = useCoordinates();

  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  }

  const mapOptions = {
    zoom: 15,
    disableDefaultUI: false,
  }

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng || !e.latLng) return;

    setCoordinates({
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng()
    });

    onOpenModal?.()
  }

  return (
    <Box sx={{ width: '75%', position: 'relative' }}>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          zoom={15}
          center={{
            lat: coordinates.latitude,
            lng: coordinates.longitude,
          }}
          options={mapOptions}
          onRightClick={handleMapClick}
          mapContainerStyle={mapContainerStyle}
        >
          {coordinates.latitude && coordinates.longitude && (
            <Marker
              position={{
                lat: coordinates.latitude,
                lng: coordinates.longitude,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  )
}