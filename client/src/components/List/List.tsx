import styles from "./List.module.css";

type Props = {
  children: React.ReactNode;
};

export default function List({ children }: Props) {
  return <ul className={styles.list}>{children}</ul>;
}
