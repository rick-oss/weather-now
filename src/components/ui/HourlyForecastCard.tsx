import styles from "./HourlyForecastCard.module.css";

interface HourlyForecastCardProps {
  icon: string;
  hour: string;
  temperature: number;
}

function HourlyForecastCard({ icon, hour, temperature }: HourlyForecastCardProps) {
  return (
    <div className={styles.hourly_card}>
      <div>
        <img src={icon} alt="Hourly Forecast Icon" />
        <span>{hour}</span>
      </div>
      <span className={styles.temp_hourly_card}>{temperature}°</span>
    </div>
  );
}

export default HourlyForecastCard;
