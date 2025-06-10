import React from "react";
import emptySrc from "./assets/empty.png";
import styles from "./Empty.module.css";

type EmptyProps = {
  message?: string;
};

export const Empty: React.FC<EmptyProps> = ({
  message = "No data available",
}) => {
  return (
    <div className={styles.empty}>
      <img src={emptySrc} alt="no data" height={100} />
      <p className={styles.message}>{message}</p>
    </div>
  );
};
