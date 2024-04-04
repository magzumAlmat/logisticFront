import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels({
  options,
  onChange,
  value,
  label,
  helperText = "",
  disabled = false,
  required = false,
}) {
  return (
    <div>
      <FormControl sx={{ width: "200px" }} required={required}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label={label}
          onChange={onChange}
          disabled={disabled}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText !== "" && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
}
