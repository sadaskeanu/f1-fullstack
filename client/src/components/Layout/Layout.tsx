import type { ReactNode } from "react";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return <div className={styles.layout}>{children}</div>;
}

export default Layout;
