import { useState, useEffect } from "react";

import styles from "./UnitsDropdown.module.css";

import UnitCard from "./UnitCard";
import { useWeather } from "../../context/WeatherContext";

interface UnitsDropdownProps {
  isOpen: boolean;
  onSetDropdown: (isOpen: boolean) => void;
}

function UnitsDropdown({ isOpen, onSetDropdown }: UnitsDropdownProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { unitMode, setUnitMode } = useWeather();

  console.log(unitMode);
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUnitChangeAndClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onSetDropdown(false);
    }, 300);
    setUnitMode((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return (
    <div className={`${styles.units_dropdown} ${isVisible ? styles.show : ""}`}>
      <button onClick={() => handleUnitChangeAndClose()}>
        <span>Switch to {unitMode === "metric" ? "imperial" : "metric"}</span>
      </button>
      <UnitCard title="Temperature" option1="Celsius (°C)" option2="Fahrenheit (°F)" unit={unitMode} />
      <UnitCard title="Wind Speed" option1="km/h" option2="mph" unit={unitMode} />
      <UnitCard title="Precipitation" option1="Millimeters (mm)" option2="Inches (in)" unit={unitMode} />
    </div>
  );
}

export default UnitsDropdown;
