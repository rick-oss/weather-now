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
    setIsLoading,
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
        setIsLoading(true);

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

          const nowUTC = new Date(); // hora atual do PC em UTC
          const cityOffset = data.utc_offset_seconds * 1000; // utc_offset_seconds da API

          const nowCity = new Date(nowUTC.getTime() + cityOffset);
          const nowCityStr = nowCity.toISOString().slice(0, 13) + ":00"; // "2025-09-29T15:00"
          const dateStr = nowCity.toISOString().slice(0, 10); // 2025-09-29

          const newDate = new Date(dateStr + "T00:00:00");

          const currentHourIndex: number = data.hourly.time.findIndex((index: string) => index === nowCityStr);
          setUtcOffset(currentHourIndex);

          // Current Forecast
          const currentForecast = {
            dateInfo: getDateInfo(dateStr, newDate),
            temperature: Math.round(data.hourly.temperature_2m[currentHourIndex]),
            feelsLike: Math.round(data.hourly.apparent_temperature[currentHourIndex]),
            humidity: data.hourly.relative_humidity_2m[currentHourIndex],
            windSpeed: Math.round(data.hourly.wind_speed_10m[currentHourIndex]),
            precipitation: data.hourly.precipitation[currentHourIndex],
            weatherCode: data.hourly.weather_code[currentHourIndex],
          };
          setCurrentForecast(currentForecast);

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
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchWeather();
  }, [
    location?.latitude,
    location?.longitude,
    url,
    setCurrentForecast,
    setDailyForecast,
    setHourlyForecast,
    setUtcOffset,
    setIsLoading,
  ]);

  useEffect(() => {
    async function getRegion(lat: number, lon: number) {
      if (lat !== null && lon !== null) {
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?types=place&access_token=${mapboxgl.accessToken}&limit=1`
          );
          const data = await response.json();
          if (data.features.length > 0) {
            const city = data.features[0].place_name;
            setRegion(city);
          }
        } catch (err) {
          console.log("Erro ao buscar cidade:", err);
        } finally {
          setIsLoading(false);
        }
      }
    }

    if (location?.latitude != null && location?.longitude != null) {
      getRegion(location.latitude, location.longitude);
    }
  }, [location, setRegion, setIsLoading]);
}
