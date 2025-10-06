import styles from "./ErrorPage.module.css";

import iconError from "../../assets/icon-error.svg";
import iconRetry from "../../assets/icon-retry.svg";

function Error() {
  return (
    <section className={styles.wrapper_error}>
      <img src={iconError} alt="" />
      <h2>Something went wrong</h2>
      <p>We couldn’t connect to the server (API error). Please try again in a few moments.</p>
      <button onClick={() => window.location.reload()}>
        <img src={iconRetry} alt="" />
        <span>Retry</span>
      </button>
    </section>
  );
}

export default Error;
