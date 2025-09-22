import styles from "./WeatherPage.module.css";

import iconSunny from "../../assets/icon-sunny.webp";

import Header from "../header/Header";
import SearchBar from "../mainContent/SearchBar";
import WeatherInfo from "../mainContent/WeatherInfo";

function WeatherPage() {
  return (
    <div className={styles.weather_page}>
      <Header />
      <h1>How's the sky looking today?</h1>
      <main className={styles.main_content}>
        <SearchBar />
        <section className={styles.wrapper_content}>
          <WeatherInfo
            location="Berlin, Germany"
            date="Tuesday, Aug 5, 2025"
            temperature="20°"
            temperature_icon={iconSunny}
          />
        </section>
      </main>
    </div>
  );
}

export default WeatherPage;
