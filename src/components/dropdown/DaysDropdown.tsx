import { useState, useEffect } from "react";

import styles from "./DaysDropdown.module.css";

import iconCheckMark from "../../assets/icon-checkmark.svg";

interface DaysDropdownProps {
  isOpen: boolean;
  selectedDay: string;
  onSelectDay: (item: string) => void;
}

function DaysDropdown({ isOpen, selectedDay, onSelectDay }: DaysDropdownProps) {
  const [isVisible, setIsVisible] = useState(false);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ul className={`${styles.days_dropdown} ${isVisible ? styles.show : ""}`}>
      {days.map((day, index) => (
        <li key={index} className={`${styles.card_day} ${selectedDay === day ? styles.active : ""}`}>
          <button onClick={() => onSelectDay(day)}>
            <span>{day}</span>
            <img src={iconCheckMark} alt="" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default DaysDropdown;
