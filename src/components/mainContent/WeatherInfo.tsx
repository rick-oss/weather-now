import styles from "./WeatherInfo.module.css";

import WeatherDetailsCard from "../ui/WeatherDetailsCard";

interface WeatherInfoProps {
  location: string;
  date: string;
  temperature: string;
  temperature_icon: string;
}

function WeatherInfo({ location, date, temperature, temperature_icon }: WeatherInfoProps) {
  return (
    <section className={styles.weather_info}>
      <div className={styles.weather_main_info}>
        <div className={styles.weather_location}>
          <h2>{location}</h2>
          <p>{date}</p>
        </div>
        <div className={styles.weather_temperature}>
          <img src={temperature_icon} alt="Weather icon" />
          <span>{temperature}</span>
        </div>
      </div>
      <div className={styles.weather_details}>
        <WeatherDetailsCard detailName="Feels Like" detailValue="18°" />
        <WeatherDetailsCard detailName="Humidity" detailValue="46%" />
        <WeatherDetailsCard detailName="Wind" detailValue="14km/h" />
        <WeatherDetailsCard detailName="Precipitation" detailValue="0 mm" />
      </div>
    </section>
  );
}

export default WeatherInfo;
