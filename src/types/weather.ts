// types.ts
import type { Dispatch, SetStateAction } from "react";
import type {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
  GroupedHourly,
  Location,
  Units,
} from "../context/WeatherContext";

export type GroupedHourlyType = Record<string, HourlyWeather[]>;

export interface WeatherApiProps {
  units: Units; // ex: "metric" ou "imperial"
  location: Location | null; // pode ser null antes de definir
  setLocation: Dispatch<SetStateAction<Location | null>>;
  setCurrentForecast: Dispatch<SetStateAction<CurrentWeather | null>>;
  setDailyForecast: Dispatch<SetStateAction<DailyWeather | null>>;
  setHourlyForecast: Dispatch<SetStateAction<GroupedHourly | null>>;
  setUtcOffset: Dispatch<SetStateAction<number | null>>;
  setRegion: Dispatch<SetStateAction<string | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
  setIsSearchProgress: Dispatch<SetStateAction<boolean>>;
}
