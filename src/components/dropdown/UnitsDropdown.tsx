import { useState, useEffect } from "react";

import styles from "./UnitsDropdown.module.css";

import iconCheckMark from "../../assets/icon-checkmark.svg";

import UnitCard from "./UnitCard";

function UnitsDropdown({ isOpen }: { isOpen: boolean }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.units_dropdown} ${isVisible ? styles.show : ""}`}>
      <button>
        <span>Switch to Imperial</span>
        <img src={iconCheckMark} alt="" />
      </button>
      <UnitCard title="Temperature" option1="Celsius (°C)" option2="Fahrenheit (°F)" unit="metric" />
      <UnitCard title="Wind Speed" option1="km/h" option2="mph" unit="metric" />
      <UnitCard title="Precipitation" option1="Millimeters (mm)" option2="Inches (in)" unit="metric" />
    </div>
  );
}

export default UnitsDropdown;
