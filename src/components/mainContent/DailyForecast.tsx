import styles from "./DailyForecast.module.css";

import DailyForecastCard from "../ui/DailyForecastCard";

import { useWeather } from "../../context/WeatherContext";
import { getWeatherIcon } from "../../utils/getWeatherIcon";

function DailyForecast() {
  const { dailyForecast } = useWeather();

  return (
    <section className={styles.daily_forecast}>
      <h3>Daily forecast</h3>
      <div className={styles.cards_daily_forecast}>
        {dailyForecast?.days?.map((day, index) => (
          <DailyForecastCard
            key={index}
            day={day.weekDay}
            icon={getWeatherIcon(day.weatherCode)}
            temp_max={day.max_temperature}
            temp_min={day.min_temperature}
          />
        ))}
      </div>
    </section>
  );
}

export default DailyForecast;
