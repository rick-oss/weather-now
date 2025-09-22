import styles from "./SearchBar.module.css";

import iconSearch from "../../assets/icon-search.svg";

function SearchBar() {
  return (
    <div className={`${styles.search_bar}`}>
      <input className={styles.input_search_bar} type="text" name="search" placeholder="Search for a place..." />
      <i className={styles.icon_search_bar}>
        <img src={iconSearch} alt="" />
      </i>
      <button className={styles.button_search_bar}>
        <p>Search</p>
      </button>
    </div>
  );
}

export default SearchBar;
