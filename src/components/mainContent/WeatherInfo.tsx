import styles from "./WeatherInfo.module.css";

import WeatherDetailsCard from "../ui/WeatherDetailsCard";

import { useWeather } from "../../context/WeatherContext";
import { getWeatherIcon } from "../../utils/getWeatherIcon";

function WeatherInfo() {
  const { currentForecast, region, unitMode } = useWeather();

  return (
    <section className={styles.weather_info}>
      <div className={styles.weather_main_info}>
        <div className={styles.weather_location}>
          <h2>{region}</h2>
          <p>{currentForecast?.dateInfo}</p>
        </div>
        <div className={styles.weather_temperature}>
          <img src={getWeatherIcon(currentForecast?.weatherCode ?? 0)} alt="Weather icon" />
          <span>{currentForecast?.temperature}°</span>
        </div>
      </div>
      <div className={styles.weather_details}>
        <WeatherDetailsCard detailName="Feels Like" detailValue={`${currentForecast?.feelsLike ?? 0}°`} />
        <WeatherDetailsCard detailName="Humidity" detailValue={`${currentForecast?.humidity ?? 0}%`} />
        <WeatherDetailsCard
          detailName="Wind"
          detailValue={`${currentForecast?.windSpeed ?? 0} ${unitMode === "metric" ? "km/h" : "mph"}`}
        />
        <WeatherDetailsCard
          detailName="Precipitation"
          detailValue={`${currentForecast?.precipitation ?? 0} ${unitMode === "metric" ? "mm" : "inch"} `}
        />
      </div>
    </section>
  );
}

export default WeatherInfo;
