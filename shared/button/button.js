import { Tooltip } from "@mui/material";
import Icon from "../icon/icon";
import styles from "./button.module.css";
import Link from "next/link";
import { memo } from "react";

const Button = memo(function Button({
  children,
  type = "transparent",
  icon,
  onClick,
  tooltipTitle,
  reversed = false,
  iconColor = "gray",
  iconBg = "transparent",
  link = "",
  disabled = false,
  className = "",
  outlineColor = "gray",
}) {
  let buttonClass = styles.transparent;

  switch (type) {
    case "primary":
      buttonClass = styles.primary;
      break;
    case "secondary":
      buttonClass = styles.secondary;
      break;
    case "warning":
      buttonClass = styles.warning;
      break;
    case "outline":
      buttonClass = styles.outline;
      break;
    default:
      break;
  }

  if (link.length > 0) {
    return (
      <Link
        className={`${styles.button} ${buttonClass} ${
          reversed && styles.reversed
        } ${className}`}
        href={link}
      >
        {icon && (
          <Icon color={iconColor} bg={iconBg}>
            {icon}
          </Icon>
        )}
        {children}
      </Link>
    );
  }

  if (type === "submit") {
    return (
      <button
        className={`${styles.button} ${styles.primary} ${
          reversed && styles.reversed
        } ${className}`}
        disabled={disabled}
      >
        {icon && (
          <Icon color={iconColor} bg={iconBg}>
            {icon}
          </Icon>
        )}
        {children}
      </button>
    );
  }

  return (
    <Tooltip title={tooltipTitle}>
      <button
        className={`${styles.button} ${buttonClass} ${
          reversed && styles.reversed
        } ${className}`}
        onClick={onClick}
        type={type === "submit" ? "submit" : "button"}
        disabled={disabled}
      >
        {icon && (
          <Icon color={iconColor} bg={iconBg}>
            {icon}
          </Icon>
        )}
        {children}
      </button>
    </Tooltip>
  );
});

export default Button;
