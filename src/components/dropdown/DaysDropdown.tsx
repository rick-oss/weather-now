import { useState, useEffect } from "react";
import styles from "./DaysDropdown.module.css";

import iconCheckMark from "../../assets/icon-checkmark.svg";

import { useWeather } from "../../context/WeatherContext";

type DaysDropdownProps = {
  isOpen: boolean;
  onSetDropdown: (isOpen: boolean) => void;
  selectedDay: string | null;
  onSelectDay: (item: string) => void;
};

function DaysDropdown({ isOpen, onSetDropdown, selectedDay, onSelectDay }: DaysDropdownProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { hourlyForecast } = useWeather();

  const dates = Object.keys(hourlyForecast ?? {});
  const days = dates;

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectDayAndClose = (day: string) => {
    setIsVisible(false);
    setTimeout(() => {
      onSetDropdown(false);
    }, 300);
    onSelectDay(day);
  };

  return (
    <ul className={`${styles.days_dropdown} ${isVisible ? styles.show : ""}`}>
      {days.map((day, index) => (
        <li key={index} className={`${styles.card_day} ${selectedDay === day ? styles.active : ""}`}>
          <button onClick={() => handleSelectDayAndClose(day)}>
            <span>{day}</span>
            <img src={iconCheckMark} alt="" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default DaysDropdown;
