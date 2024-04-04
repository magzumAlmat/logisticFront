"use client";

import Avatar from "@mui/material/Avatar";
import React, { useState } from "react";
import styles from "./user.module.css";
import { ChevronDown } from "lucide-react";
import Button from "@/shared/button/button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "@/slice/authSlice";

function stringToColor(string) {
  if (!string) {
    return "#fff";
  }

  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name}`,
  };
}

export default function User() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleAdminClick = () => {
    router.push("/admin");
  };

  return (
    <div className={styles.user}>
      <Avatar {...stringAvatar(user?.full_name)}>{user?.full_name[0]}</Avatar>
      <div className={styles.info}>
        <p className={styles.role}>{user?.role}</p>
        <p className={styles.name}>{user?.full_name}</p>
      </div>
      <Button
        type="transparent"
        icon={<ChevronDown />}
        onClick={handleClick}
      ></Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user?.role === "admin" && (
          <MenuItem onClick={handleAdminClick}>Панель администратора</MenuItem>
        )}
        <MenuItem onClick={handleLogout}>Выйти</MenuItem>
      </Menu>
    </div>
  );
}
