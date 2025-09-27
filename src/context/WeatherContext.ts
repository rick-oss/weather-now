import { createContext, useContext } from "react";

export interface CurrentWeather {
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  precipitation: string;
}

interface WeatherContextType {
  currentForecast: CurrentWeather | null;
  setCurrentForecast: (weather: CurrentWeather) => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error("useWeather must be used within a WeatherProvider");
  return context;
};
