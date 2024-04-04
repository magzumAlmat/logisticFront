import Link from "next/link";
import styles from "./dashboard.module.css";
import { useSelector } from "react-redux";
import { selectMyModule } from "@/slice/moduleSlice";

export default function Logo({ minimized = false }) {
  const myModule = useSelector(selectMyModule);

  if (minimized) {
    return (
      <Link href="/" className={styles.logo}>
        <div className={`${styles.logoIcon} ${styles[myModule]}`}>L</div>
      </Link>
    );
  }
  return (
    <Link href="/" className={styles.logo}>
      <div className={`${styles.logoIcon} ${styles[myModule]}`}>L</div>
      <p className="font-white">
        Logistics <br /> CRM
      </p>
    </Link>
  );
}
