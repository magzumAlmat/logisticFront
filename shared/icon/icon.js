import styles from "./icon.module.css";

export default function Icon({ children, color = "gray", bg = "transparent" }) {
  return (
    <div className={`${styles.icon} ${styles[color]} ${styles["bg" + bg]}`}>
      {children}
    </div>
  );
}
