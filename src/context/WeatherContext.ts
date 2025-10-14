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

export interface HourlyWeather {
  hour: string;
  currentHour: string;
  temperature: number;
  weatherCode: number;
}
export type GroupedHourly = Record<string, HourlyWeather[]>;

export type UnitMode = "metric" | "imperial";

export type Units = {
  temperature: "celsius" | "fahrenheit";
  windSpeed: "kmh" | "mph";
  precipitation: "mm" | "inch";
};

export type Location = {
  latitude: number | null;
  longitude: number | null;
} | null;

export interface WeatherContextType {
  currentForecast: CurrentWeather | null;
  setCurrentForecast: (weather: CurrentWeather) => void;
  dailyForecast: DailyWeather | null;
  setDailyForecast: (weather: DailyWeather) => void;
  hourlyForecast: GroupedHourly | null;
  setHourlyForecast: (weather: GroupedHourly) => void;
  location: Location;
  setLocation: (loc: Location) => void;
  region: string | null;
  setRegion: (city: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isSearching: boolean;
  setIsSearching: (searchLoading: boolean) => void;
  utcOffset: number | null;
  setUtcOffset: (offset: number) => void;
  error: boolean;
  setError: (error: boolean) => void;
  unitMode: UnitMode;
  setUnitMode: React.Dispatch<React.SetStateAction<UnitMode>>;
  units: Units;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error("useWeather must be used within a WeatherProvider");
  return context;
};
