import { Link } from "react-router-dom";
import clsx from "clsx";

import styles from "../BackLink/BackLink.module.css";

type Props = {
  to: string;
  children: React.ReactNode;
};

export default function BackLink({ children, to }: Props) {
  return (
    <Link className={styles.wrap} to={to}>
      <div className={clsx(styles.arrow, styles.left)} />
      <div className={styles.link}>{children}</div>
    </Link>
  );
}
