import styles from "./Header.module.css";

import logo from "../../assets/logo.svg";
import iconUnits from "../../assets/icon-units.svg";
import iconDropdown from "../../assets/icon-dropdown.svg";

function Header() {
  return (
    <header className={styles.wrapper_header}>
      <img src={logo} className={styles.image_logo} alt="Weather Now logo" />
      <button className={styles.button_units}>
        <img src={iconUnits} alt="" />
        <span>Units</span>
        <img src={iconDropdown} alt="" />
      </button>
    </header>
  );
}

export default Header;
