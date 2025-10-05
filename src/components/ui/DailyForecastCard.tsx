import styles from "./DailyForecastCard.module.css";

import { useWeather } from "../../context/WeatherContext";

interface DailyForecastCardProps {
  day: string;
  icon: string;
  temp_max: number;
  temp_min: number;
}

function DailyForecastCard({ day, icon, temp_max, temp_min }: DailyForecastCardProps) {
  const { isLoading } = useWeather();

  return (
    <article className={styles.daily_card}>
      {isLoading ? (
        ""
      ) : (
        <>
          <p>{day}</p>
          <img src={icon} alt="Daily Forecast Icon" />
          <div className={styles.temp_daily_card}>
            <span className={styles.temp_max}>{temp_max}°</span>
            <span className={styles.temp_min}>{temp_min}°</span>
          </div>
        </>
      )}
    </article>
  );
}

export default DailyForecastCard;
