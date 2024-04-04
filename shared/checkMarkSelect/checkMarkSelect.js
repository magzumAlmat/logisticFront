import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({
  allColumns,
  selectedColumns,
  handleColumnChange,
}) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedColumns = allColumns.filter((column) =>
      value.includes(column.id)
    );
    handleColumnChange(selectedColumns);
  };

  const getSelectedLabels = (selectedValues) => {
    return selectedValues
      .map(
        (selectedId) =>
          allColumns.find((column) => column.id === selectedId).label
      )
      .join(", ");
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 220 }} size="small">
        <InputLabel id="demo-multiple-checkbox-label">
          Отображение колонок
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedColumns.map((column) => column.id)}
          onChange={handleChange}
          input={<OutlinedInput label="Отображение колонок" />}
          renderValue={(selected) => getSelectedLabels(selected)}
          MenuProps={MenuProps}
        >
          {allColumns.map((column) => (
            <MenuItem key={column.id} value={column.id}>
              <Checkbox
                checked={selectedColumns.some(
                  (selected) => selected.id === column.id
                )}
              />
              <ListItemText primary={column.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
