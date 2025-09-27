import { useState } from "react";
import type { ReactNode } from "react";
import { WeatherContext } from "./WeatherContext";
import type { CurrentWeather } from "./WeatherContext";

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [currentForecast, setCurrentForecast] = useState<CurrentWeather | null>(null);

  return <WeatherContext.Provider value={{ currentForecast, setCurrentForecast }}>{children}</WeatherContext.Provider>;
}
