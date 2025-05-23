import styles from "./Heading.module.css";

type Props = {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

export default function Heading({ children, level }: Props) {
  const Component = `h${level}` as const;

  return <Component className={styles.heading}>{children}</Component>;
}
