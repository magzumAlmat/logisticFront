"use client";

import styles from "./dashboard.module.css";
import Logo from "@/components/dashboard/logo";
import ModuleDropdown from "./moduleDropdown/moduleDropdown";
import MenuLinks from "./menuLinks/menuLinks";
import User from "@/components/header/user/user";
import { useSelector } from "react-redux";
import { selectMyModule } from "@/slice/moduleSlice";

export default function Dashboard() {
  const myModule = useSelector(selectMyModule);
  return (
    <nav className={`${styles.nav} ${styles[myModule]}`}>
      <div className={styles.header}>
        <Logo />
        <ModuleDropdown />
        <MenuLinks module={myModule} />
      </div>
      <div className="flexAlignCenter">
        <User />
      </div>
    </nav>
  );
}
