import styles from "./UnitCard.module.css";

import iconCheckMark from "../../assets/icon-checkmark.svg";

type UnitCardProps = {
  title: string;
  option1: string;
  option2: string;
  unit: "metric" | "imperial";
};

function UnitCard({ title, option1, option2, unit }: UnitCardProps) {
  return (
    <div className={styles.unit_card}>
      <h5>{title}</h5>
      <ul className={styles.options_unit_card}>
        <li className={`${styles.top_option} ${unit === "metric" ? styles.active : ""}`}>
          <span>{option1}</span>
          <img src={iconCheckMark} alt="" />
        </li>
        <li className={`${unit === "imperial" ? styles.active : ""}`}>
          <span>{option2}</span>
          <img src={iconCheckMark} alt="" />
        </li>
      </ul>
    </div>
  );
}
export default UnitCard;
