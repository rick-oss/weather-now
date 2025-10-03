import { useState, useEffect } from "react";

import styles from "./UnitsDropdown.module.css";

import UnitCard from "./UnitCard";
import { useWeather } from "../../context/WeatherContext";

function UnitsDropdown({ isOpen }: { isOpen: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const { unitMode, setUnitMode } = useWeather();

  console.log(unitMode);
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.units_dropdown} ${isVisible ? styles.show : ""}`}>
      <button
        onClick={() => {
          setUnitMode((prev) => (prev === "metric" ? "imperial" : "metric"));
        }}
      >
        <span>Switch to {unitMode === "metric" ? "imperial" : "metric"}</span>
      </button>
      <UnitCard title="Temperature" option1="Celsius (°C)" option2="Fahrenheit (°F)" unit={unitMode} />
      <UnitCard title="Wind Speed" option1="km/h" option2="mph" unit={unitMode} />
      <UnitCard title="Precipitation" option1="Millimeters (mm)" option2="Inches (in)" unit={unitMode} />
    </div>
  );
}

export default UnitsDropdown;
