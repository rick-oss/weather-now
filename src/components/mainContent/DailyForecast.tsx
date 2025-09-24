import styles from "./DailyForecast.module.css";

import iconRain from "../../assets/icon-rain.webp";
import iconDrizzle from "../../assets/icon-drizzle.webp";
import iconSunny from "../../assets/icon-sunny.webp";
import iconPartlyCloud from "../../assets/icon-partly-cloudy.webp";
import iconStorm from "../../assets/icon-storm.webp";
import iconSnow from "../../assets/icon-snow.webp";
import iconFog from "../../assets/icon-fog.webp";

import DailyForecastCard from "../ui/DailyForecastCard";

function DailyForecast() {
  return (
    <section className={styles.daily_forecast}>
      <h3>Daily forecast</h3>
      <div className={styles.cards_daily_forecast}>
        <DailyForecastCard day="Ter" icon={iconRain} temp_max={20} temp_min={14} />
        <DailyForecastCard day="Wed" icon={iconDrizzle} temp_max={21} temp_min={15} />
        <DailyForecastCard day="Thu" icon={iconSunny} temp_max={24} temp_min={14} />
        <DailyForecastCard day="Fri" icon={iconPartlyCloud} temp_max={25} temp_min={13} />
        <DailyForecastCard day="Sat" icon={iconStorm} temp_max={21} temp_min={15} />
        <DailyForecastCard day="Sun" icon={iconSnow} temp_max={25} temp_min={16} />
        <DailyForecastCard day="Mon" icon={iconFog} temp_max={24} temp_min={15} />
      </div>
    </section>
  );
}

export default DailyForecast;
