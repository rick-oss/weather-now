import { useEffect } from "react";
import useGeolocation from "./useGeolocation.ts";
import { useWeather } from "../context/WeatherContext.ts";
import type { GroupedHourly } from "../context/WeatherContext.ts";

import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

export function useWeatherApi() {
  const {
    units,
    location,
    setLocation,
    setCurrentForecast,
    setDailyForecast,
    setHourlyForecast,
    setUtcOffset,
    setRegion,
  } = useWeather();
  const { geolocation } = useGeolocation();

  const params = {
    latitude: location?.latitude,
    longitude: location?.longitude,
    temperature_unit: units?.temperature,
    windspeed_unit: units?.windSpeed,
    precipitation_unit: units?.precipitation,
    hourly: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "wind_speed_10m",
      "precipitation",
      "weather_code",
    ],
    daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
  };

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&daily=${params.daily}&hourly=${params.hourly}&temperature_unit=${params.temperature_unit}&windspeed_unit=${params.windspeed_unit}&precipitation_unit=${params.precipitation_unit}&timezone=auto`;

  function shortWeekday(dateString: string) {
    const day = new Date(dateString + "T00:00:00");
    return day.toLocaleDateString("en-US", { weekday: "short" });
  }

  function longWeekday(dateString: string) {
    const day = new Date(dateString + "T00:00:00");
    return day.toLocaleDateString("en-US", { weekday: "long" });
  }

  useEffect(() => {
    if (geolocation.latitude && geolocation.longitude) {
      setLocation(geolocation);
    }
  }, [geolocation, setLocation]);

  useEffect(() => {
    async function fetchWeather() {
      if (location?.latitude && location?.longitude) {
        try {
          const response = await fetch(url);
          const data = await response.json();

          if (!response.ok) {
            throw new Error("Erro ao buscar dados da API");
          }

          const getDateInfo = (weekDay: string, dateParam: Date) => {
            const weekDai = longWeekday(weekDay);
            const month = dateParam.toLocaleString("en-US", { month: "short" });
            const dayOfMonth = dateParam.getDate();
            const year = dateParam.toLocaleString("en-US", { year: "numeric" });
            return `${weekDai}, ${month} ${dayOfMonth}, ${year}`;
          };

          if (!acc[dayWeek]) {
            acc[dayWeek] = [];
          }

          acc[dayWeek].push(forecast);

          return acc;
        }, {} as GroupedHourly);

        setHourlyForecast(grouped);

        console.log(grouped);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchWeather();
  }, [url, setDailyForecast, setHourlyForecast, setUtcOffset]);
}
