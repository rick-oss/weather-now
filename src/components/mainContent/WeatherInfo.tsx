import { useEffect } from "react";
import styles from "./WeatherInfo.module.css";

import WeatherDetailsCard from "../ui/WeatherDetailsCard";

import { useWeather } from "../../context/WeatherContext";
import { getWeatherIcon } from "../../utils/getWeatherIcon";
import { getWeatherBackground } from "../../utils/getWeatherBackground";

function WeatherInfo() {
  const { currentForecast, region, isLoading, unitMode } = useWeather();

  useEffect(() => {
    if (!isLoading) {
      // força o Chrome a repintar o layout
      requestAnimationFrame(() => {
        document.body.style.transform = "translateZ(0)";
        const _ = document.body.offsetHeight; // força reflow
        document.body.style.transform = "";
      });
    }
  }, [isLoading]);

  return (
    <section className={styles.weather_info}>
      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.loading_dots}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className={styles.loading_label}>Loading...</p>
        </div>
      ) : (
        <div className={styles.weather_main_info}>
          <video
            src={getWeatherBackground(currentForecast?.weatherCode ?? 0)}
            autoPlay
            loop
            muted
            className={styles.weather_video}
          />
          <div className={styles.weather_location}>
            <h2>{region}</h2>
            <p>{currentForecast?.dateInfo}</p>
          </div>
          <div className={styles.weather_temperature}>
            <img src={getWeatherIcon(currentForecast?.weatherCode ?? 0)} alt="Weather icon" />
            <span>{currentForecast?.temperature}°</span>
          </div>
        </div>
      )}
      <div className={styles.weather_details}>
        <WeatherDetailsCard
          detailName="Feels Like"
          detailValue={`${isLoading ? "-" : `${currentForecast?.feelsLike}°`}`}
        />
        <WeatherDetailsCard
          detailName="Humidity"
          detailValue={`${isLoading ? "-" : `${currentForecast?.humidity}%`}`}
        />
        <WeatherDetailsCard
          detailName="Wind"
          detailValue={`${isLoading ? "-" : `${currentForecast?.windSpeed} ${unitMode === "metric" ? "km/h" : "mph"}`}`}
        />
        <WeatherDetailsCard
          detailName="Precipitation"
          detailValue={`${
            isLoading ? "-" : `${currentForecast?.precipitation} ${unitMode === "metric" ? "mm" : "inch"}`
          } `}
        />
      </div>
    </section>
  );
}

export default WeatherInfo;
