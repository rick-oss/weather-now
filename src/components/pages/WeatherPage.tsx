import styles from "./WeatherPage.module.css";

import Header from "../header/Header";
import SearchBar from "../mainContent/SearchBar";
import WeatherInfo from "../mainContent/WeatherInfo";
import DailyForecast from "../mainContent/DailyForecast";
import HourlyForecast from "../mainContent/HourlyForecast";
import ErrorPage from "../mainContent/ErrorPage";

import { useWeather } from "../../context/WeatherContext";

function WeatherPage() {
  const { error } = useWeather();

  return (
    <div className={styles.weather_page}>
      <Header />
      {error ? (
        <ErrorPage />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default WeatherPage;
