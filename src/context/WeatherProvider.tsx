import { useState } from "react";
import type { ReactNode } from "react";
import { WeatherContext } from "./WeatherContext";
import type { CurrentWeather, DailyWeather, GroupedHourly, Location, UnitMode } from "./WeatherContext";

const unitMap = {
  metric: {
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  } as const,
  imperial: {
    temperature: "fahrenheit",
    windSpeed: "mph",
    precipitation: "inch",
  } as const,
};

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [currentForecast, setCurrentForecast] = useState<CurrentWeather | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DailyWeather | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<GroupedHourly | null>(null);
  const [location, setLocation] = useState<Location>(null);
  const [utcOffset, setUtcOffset] = useState<number | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [unitMode, setUnitMode] = useState<UnitMode>("metric");

  return (
    <WeatherContext.Provider
      value={{
        currentForecast,
        setCurrentForecast,
        dailyForecast,
        setDailyForecast,
        hourlyForecast,
        setHourlyForecast,
        location,
        setLocation,
        region,
        setRegion,
        isLoading,
        setIsLoading,
        utcOffset,
        setUtcOffset,
        unitMode,
        setUnitMode,
        units: unitMap[unitMode],
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
