import styles from "./Card.module.css";
import clsx from "clsx";
import trophySrc from "./assets/trophy.png";
import flagSrc from "./assets/flag.png";

type Props = {
  name: string;
  familyName: string;
  team: string;
  season?: number;
  points?: number;
  race?: string;
  icon: "trophy" | "flag";
  isHighlighted?: boolean;
  withArrow?: boolean;
};

const mapIconToSrc = {
  trophy: trophySrc,
  flag: flagSrc,
};

export default function Card(props: Props) {
  return (
    <div
      data-testid="card"
      className={clsx(
        styles.card,
        props.isHighlighted && styles.isHighlighted
      )}>
      <img alt="icon" src={mapIconToSrc[props.icon]} height={50} />

      <div className={styles.column}>
        <p>
          {props.name} {props.familyName}
        </p>
        <p className={styles.sideText}>{props.team}</p>
      </div>

      {props.points && props.season && (
        <div className={styles.column}>
          <p>season: {props.season}</p>
          <p className={styles.sideText}>points: {props.points}</p>
        </div>
      )}

      {props.race && (
        <div className={styles.column}>
          <p className={styles.sideText}>race:</p>
          <p>{props.race}</p>
        </div>
      )}

      {props.withArrow && <div className={clsx(styles.arrow, styles.right)} />}
    </div>
  );
}
