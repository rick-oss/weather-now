import styles from "./HourlyForecast.module.css";

import iconDropDown from "../../assets/icon-dropdown.svg";

import iconOvercast from "../../assets/icon-overcast.webp";
import iconPartlyCloudy from "../../assets/icon-partly-cloudy.webp";
import iconSunny from "../../assets/icon-sunny.webp";
import iconSnow from "../../assets/icon-snow.webp";
import iconFog from "../../assets/icon-fog.webp";

import HourlyForecastCard from "../ui/HourlyForecastCard";

function HourlyForecast() {
  return (
    <section className={styles.hourly_forecast}>
      <header className={styles.header_hourly_forecast}>
        <h3>Hourly forecast</h3>
        <button>
          <span>Tuesday</span>
          <img src={iconDropDown} alt="" />
        </button>
      </header>
      <HourlyForecastCard icon={iconOvercast} hour="3 PM" temperature={20} />
      <HourlyForecastCard icon={iconPartlyCloudy} hour="4 PM" temperature={20} />
      <HourlyForecastCard icon={iconSunny} hour="5 PM" temperature={20} />
      <HourlyForecastCard icon={iconOvercast} hour="6 PM" temperature={19} />
      <HourlyForecastCard icon={iconSnow} hour="7 PM" temperature={18} />
      <HourlyForecastCard icon={iconFog} hour="8 PM" temperature={18} />
      <HourlyForecastCard icon={iconSnow} hour="9 PM" temperature={17} />
      <HourlyForecastCard icon={iconOvercast} hour="10 PM" temperature={17} />
    </section>
  );
}

export default HourlyForecast;
