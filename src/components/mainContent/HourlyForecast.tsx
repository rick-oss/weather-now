import { useState, useEffect } from "react";

import styles from "./HourlyForecast.module.css";

import iconDropDown from "../../assets/icon-dropdown.svg";

import HourlyForecastCard from "../ui/HourlyForecastCard";
import DaysDropdown from "../dropdown/DaysDropdown";

import { useWeather } from "../../context/WeatherContext";
import { getWeatherIcon } from "../../utils/getWeatherIcon";

function HourlyForecast() {
  const { hourlyForecast, utcOffset, isLoading } = useWeather();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<string | null>(null);

  useEffect(() => {
    if (hourlyForecast) {
      const dates = Object.keys(hourlyForecast ?? {});
      if (dates.length > 0) {
        setActiveDay(dates[0]);
      }
    }
  }, [hourlyForecast, setActiveDay]);

  const dates = Object.keys(hourlyForecast ?? {});
  const startIndex = activeDay === dates[0] ? utcOffset ?? 0 : 0;
  const endIndex = startIndex + 8;

  return (
    <section className={styles.hourly_forecast}>
      <header className={styles.header_hourly_forecast}>
        <h3>Hourly forecast</h3>
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <span>{isLoading ? "-" : activeDay}</span>
          <img src={iconDropDown} alt="" />
        </button>
        {isDropdownOpen && <DaysDropdown isOpen={isDropdownOpen} onSetDropdown={setIsDropdownOpen} selectedDay={activeDay} onSelectDay={setActiveDay} />}
      </header>
      {activeDay &&
        hourlyForecast?.[activeDay]
          ?.slice(startIndex, endIndex)
          .map((forecast, idx) => (
            <HourlyForecastCard
              key={idx}
              icon={getWeatherIcon(forecast.weatherCode)}
              hour={forecast.hour}
              temperature={forecast.temperature}
            />
          ))}
    </section>
  );
}

export default HourlyForecast;
