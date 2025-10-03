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
    latitude: 52.52,
    longitude: 13.41,
    hourly: ["temperature_2m", "weather_code"],
    daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
  };

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&daily=${params.daily}&hourly=${params.hourly}&timezone=auto`;

  function shortWeekday(dateString: string) {
    const day = new Date(dateString + "T00:00:00");
    return day.toLocaleDateString("en-US", { weekday: "short" });
  }

  function longWeekday(dateString: string) {
    const day = new Date(dateString + "T00:00:00");
    return day.toLocaleDateString("en-US", { weekday: "long" });
  }

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }

        const nowUTC = new Date(); // hora atual do PC em UTC
        const cityOffset = data.utc_offset_seconds * 1000; // utc_offset_seconds da API
        const nowCity = new Date(nowUTC.getTime() + cityOffset);
        const nowCityStr = nowCity.toISOString().slice(0, 13) + ":00"; // "2025-09-29T15:00"
        console.log(nowCityStr);

        const startIndex: number = data.hourly.time.findIndex((index: string) => index === nowCityStr);

        setUtcOffset(startIndex);

        // Daily Forecast
        const temperatures_max = data.daily.temperature_2m_max;
        const temperature_min = data.daily.temperature_2m_min;
        const weather_code = data.daily.weather_code;
        const times = data.daily.time;
        const daysWeek = times.map(shortWeekday);

        const days = daysWeek.map((day: string, index: number) => ({
          weekDay: day,
          max_temperature: Math.round(temperatures_max[index]),
          min_temperature: Math.round(temperature_min[index]),
          weatherCode: weather_code[index],
        }));

        setDailyForecast({ days });

        // Hourly Forecast
        const hourlyTemperature = data.hourly.temperature_2m;
        const hourlyWeatherCode = data.hourly.weather_code;

        const grouped = data.hourly.time.reduce((acc: GroupedHourly, t: string, i: number) => {
          const [data, hora] = t.split("T");
          const dayWeek = longWeekday(data);

          const forecast = {
            hour: hora,
            currentHour: nowCityStr,
            temperature: Math.round(hourlyTemperature[i]),
            weatherCode: hourlyWeatherCode[i],
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
