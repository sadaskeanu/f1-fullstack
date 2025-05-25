import flagSrc from "./assets/flag.png";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div>
      <img className={styles.icon} src={flagSrc} alt="loader" width={100} />
      <p className={styles.text}>LOADING...</p>
    </div>
  );
}
