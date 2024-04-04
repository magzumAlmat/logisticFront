"use client";

import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ArrowRight, ChevronRight, Download } from "lucide-react";
import styles from "@/shared/dropdown/dropdown.module.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import ExcelPreviewModal from "@/components/loadingListExcel/preview";
import ProposalExcelGeneral from "@/components/proposalExcelGeneral/proposalExcelPreview";

function ExcelExport({ rows, headCells, pathname, custom = true }) {
  const [periodType, setPeriodType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  const style = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const handlePeriodTypeChange = (event) => {
    const selectedPeriodType = event.target.value;
    setPeriodType(selectedPeriodType);

    if (selectedPeriodType === "half-year") {
      const halfYearAgo = new Date(dayjs().subtract(6, "month"));
      setStartDate(halfYearAgo);
      setEndDate(new Date());
    } else if (selectedPeriodType === "year") {
      const yearAgo = new Date(dayjs().subtract(1, "year"));
      setStartDate(yearAgo);
      setEndDate(new Date());
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleButtonClick = () => {
    if (!periodType) {
      return;
    }
    setIsPreview(true);
  };

  return (
    <div style={style}>
      <FormControl sx={{ minWidth: 120 }} required>
        <InputLabel id="period-type-label">Период</InputLabel>
        <Select
          labelId="period-type-label"
          id="period-type-select"
          value={periodType}
          onChange={handlePeriodTypeChange}
          label={"Период"}
        >
          <MenuItem value="half-year">Полугодие</MenuItem>
          <MenuItem value="year">Год</MenuItem>
          <MenuItem value="all">За все время</MenuItem>
          {custom && <MenuItem value="custom">Выбрать период</MenuItem>}
        </Select>
      </FormControl>
      {periodType === "custom" && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DatePicker
              label="От"
              value={startDate ? dayjs(startDate) : null}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="До"
              value={endDate ? dayjs(endDate) : null}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      )}
      <Button
        variant="outlined"
        startIcon={<Download />}
        sx={{ padding: "15px" }}
        onClick={handleButtonClick}
      >
        Скачать в Excel
      </Button>
      {isPreview && pathname === "basket" && (
        <ExcelPreviewModal
          rows={rows}
          headCells={headCells}
          onClose={() => setIsPreview(false)}
          startDate={startDate}
          endDate={endDate}
        />
      )}
      {isPreview && pathname === "proposals" && (
        <ProposalExcelGeneral
          rows={rows}
          headCells={headCells}
          onClose={() => setIsPreview(false)}
          startDate={startDate}
          endDate={endDate}
        />
      )}
    </div>
  );
}

export default ExcelExport;
