import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/ru";

export default function DatePickerValue({ value, onChange, label }) {
  const handleDataChange = (date) => {
    if (dayjs(date).isValid()) {
      const isoDate = dayjs(date).toISOString();
      onChange(isoDate);
    } else {
      console.log("error");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DemoContainer
        components={["DatePicker", "DatePicker"]}
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <DatePicker
          label={label}
          value={value !== null ? dayjs(value) : null}
          onChange={handleDataChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
