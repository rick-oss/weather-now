import styles from "./HourlyForecastCard.module.css";

import { useWeather } from "../../context/WeatherContext";

interface HourlyForecastCardProps {
  icon: string;
  hour: string;
  temperature: number;
}

function HourlyForecastCard({ icon, hour, temperature }: HourlyForecastCardProps) {
  const { isLoading } = useWeather();

  return (
    <div className={styles.hourly_card}>
      {isLoading ? (
        ""
      ) : (
        <>
          <div>
            <img src={icon} alt="Hourly Forecast Icon" />
            <span>{hour}</span>
          </div>
          <span className={styles.temp_hourly_card}>{temperature}°</span>
        </>
      )}
    </div>
  );
}

export default HourlyForecastCard;
