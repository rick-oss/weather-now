import styles from "./WeatherPage.module.css";

import Header from "../header/Header";
import SearchBar from "../mainContent/SearchBar";
import WeatherInfo from "../mainContent/WeatherInfo";
import DailyForecast from "../mainContent/DailyForecast";
import HourlyForecast from "../mainContent/HourlyForecast";

import { useWeatherApi } from "../../hooks/useWeatherApi";

function WeatherPage() {
  useWeatherApi();

  return (
    <div className={styles.weather_page}>
      <Header />
      <h1>How's the sky looking today?</h1>
      <main className={styles.main_content}>
        <SearchBar />
        <section className={styles.wrapper_content}>
          <div className={styles.left_content}>
            <WeatherInfo />
            <DailyForecast />
          </div>
          <HourlyForecast />
        </section>
      </main>
    </div>
  );
}

export default WeatherPage;
