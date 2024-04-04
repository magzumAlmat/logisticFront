import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import styles from "./dropdown.module.css";

export default function Dropdown({ className, value, setValue, options }) {
  return (
    <FormControl
      sx={{
        m: 0,
        minWidth: 120,
        backgroundColor: "white",
        borderRadius: "4px",
      }}
      size="small"
      className={className}
    >
      <Select
        labelId="select-small-label"
        id="select-small"
        value={value}
        inputProps={{ "aria-label": "Without label" }}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            <div className={styles.menuItem}>
              {option.icon}
              {option.text}
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
