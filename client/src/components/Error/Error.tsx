import errorSrc from "./assets/racing-car.png";
import styles from "./Error.module.css";

type Props = {
  message?: string;
};

export default function Error({ message }: Props) {
  return (
    <div>
      <img src={errorSrc} alt="error" height={100} />
      <p className={styles.text}>{message || "Oops, something went wrong!"}</p>
    </div>
  );
}
