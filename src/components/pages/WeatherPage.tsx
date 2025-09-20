import styles from "./WeatherPage.module.css";

import Header from "../header/Header";
import SearchBar from "../mainContent/SearchBar";

function WeatherPage() {
  return (
    <div className={styles.weather_page}>
      <Header />
      <h1>How's the sky looking today?</h1>
      <main className={styles.main_content}>
        <SearchBar />
      </main>
    </div>
  );
}

export default WeatherPage;
