import { Link as ReactRouterLink } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

import styles from "./Link.module.css";

export default function Link(props: LinkProps) {
  return <ReactRouterLink {...props} className={styles.link} />;
}
