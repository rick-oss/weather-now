import styles from "./WeatherDetailsCard.module.css";

interface WeatherDetailsCardProps {
  detailName: string;
  detailValue: string;
}

function WeatherDetailsCard({ detailName, detailValue }: WeatherDetailsCardProps) {
  return (
    <dl className={styles.weather_details}>
      <dt>{detailName}</dt>
      <dd>{detailValue}</dd>
    </dl>
  );
}
export default WeatherDetailsCard;
