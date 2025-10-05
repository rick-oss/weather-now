import { useState, useEffect } from "react";
import { useWeather } from "../context/WeatherContext";

interface GeoLocation {
  latitude: number | null;
  longitude: number | null;
}

const useGeolocation = () => {
  const [geolocation, setGeoLocation] = useState<GeoLocation>({
    latitude: null,
    longitude: null,
  });
  const [permissionStatusChecked, setPermissionStatusChecked] = useState(false);
  const { setIsLoading } = useWeather();

  useEffect(() => {
    setIsLoading(true);
    // Função de sucesso quando a geolocalização é obtida
    const getCoords = (position: GeolocationPosition) => {
      setGeoLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setPermissionStatusChecked(true);
      setIsLoading(false);
    };

    // Função de erro caso o usuário não permita que algo aconteça
    const handleError = (error: GeolocationPositionError) => {
      if (error.code === error.PERMISSION_DENIED) {
        setPermissionStatusChecked(false);
      }
    };

    navigator.geolocation.getCurrentPosition(getCoords, handleError);
  }, [setIsLoading, permissionStatusChecked]);

  return { geolocation, permissionStatusChecked };
};

export default useGeolocation;
