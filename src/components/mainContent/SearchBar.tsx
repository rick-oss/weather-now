import styles from "./SearchBar.module.css";

import iconSearch from "../../assets/icon-search.svg";

function SearchBar() {
  return (
    <div className={`${styles.wrapper_search}`}>
      <input className={styles.input_search} type="text" name="search" placeholder="Search for a place..." />
      <i className={styles.icon_search}>
        <img src={iconSearch} alt="" />
      </i>
      <button className={styles.button_search}>
        <p>Search</p>
      </button>
    </div>
  );
}

export default SearchBar;
