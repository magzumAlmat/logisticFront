import React, { memo } from "react";
import styles from "./menuLink.module.css";
import Link from "next/link";
import Icon from "@/shared/icon/icon";

const MenuLink = memo(function MenuLink({
  href,
  icon,
  text,
  isActive,
  minimized,
  module,
}) {
  return (
    <Link
      href={href}
      className={`${styles.link} ${isActive ? styles.active : ""} ${
        styles[module]
      }`}
    >
      <Icon color="white">{icon}</Icon>
      {!minimized && text}
    </Link>
  );
});

export default MenuLink;
