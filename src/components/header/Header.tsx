import { useState } from "react";

import styles from "./Header.module.css";

import logo from "../../assets/logo.svg";
import iconUnits from "../../assets/icon-units.svg";
import iconDropdown from "../../assets/icon-dropdown.svg";

import UnitsDropdown from "../dropdown/UnitsDropdown";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className={styles.header}>
      <img src={logo} className={styles.image_logo} alt="Weather Now logo" />
      <button
        className={styles.button_units}
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        <img src={iconUnits} alt="" className={styles.icon_units} />
        <span>Units</span>
        <img src={iconDropdown} className={styles.icon_dropdown} alt="" />
      </button>

      {isDropdownOpen && <UnitsDropdown isOpen={isDropdownOpen} />}
    </header>
  );
}

export default Header;
