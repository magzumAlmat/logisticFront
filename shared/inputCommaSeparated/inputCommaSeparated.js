import React from "react";
import TextField from "@mui/material/TextField";

const InputCommaSeparated = ({ label, value, onChange, ...props }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const valuesArray = inputValue.split(",").map((item) => item.trim());
    onChange(valuesArray);
  };

  return (
    <>
      <TextField
        label={label}
        value={Array.isArray(value) ? value.join(", ") : value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </>
  );
};

export default InputCommaSeparated;
