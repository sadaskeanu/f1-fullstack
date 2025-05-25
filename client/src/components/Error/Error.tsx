import errorSrc from "./assets/racing-car.png";
import styles from "./Error.module.css";

export default function Error() {
  return (
    <div>
      <img src={errorSrc} alt="error" height={100} />
      <p className={styles.text}>Oops something went wrong!</p>
    </div>
  );
}
