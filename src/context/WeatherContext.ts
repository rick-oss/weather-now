import { createContext, useContext } from "react";
export interface CurrentWeather {
  dateInfo: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: string;
  weatherCode: number;
}

export interface DailyWeather {
  days: {
    weekDay: string;
    max_temperature: number;
    min_temperature: number;
    weatherCode: number;
  }[];
}

interface HourlyWeather {
  hour: string;
  currentHour: string;
  temperature: number;
  weatherCode: number;
}

export type GroupedHourly = Record<string, HourlyWeather[]>;

interface WeatherContextType {
  dailyForecast: DailyWeather | null;
  setDailyForecast: (weather: DailyWeather) => void;
  hourlyForecast: GroupedHourly | null;
  setHourlyForecast: (weather: GroupedHourly) => void;
  utcOffset: number | null;
  setUtcOffset: (offset: number) => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error("useWeather must be used within a WeatherProvider");
  return context;
};
