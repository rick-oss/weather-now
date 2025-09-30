import { useState } from "react";
import type { ReactNode } from "react";
import { WeatherContext } from "./WeatherContext";
import type { DailyWeather, GroupedHourly } from "./WeatherContext";

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [dailyForecast, setDailyForecast] = useState<DailyWeather | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<GroupedHourly | null>(null);
  const [utcOffset, setUtcOffset] = useState<number | null>(null);

  return (
    <WeatherContext.Provider
      value={{ dailyForecast, setDailyForecast, hourlyForecast, setHourlyForecast, utcOffset, setUtcOffset }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
