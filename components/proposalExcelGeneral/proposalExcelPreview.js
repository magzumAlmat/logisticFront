import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ExcelJS from "exceljs";
import { useSelector } from "react-redux";
import { selectMyModule } from "@/slice/moduleSlice";
import { selectPathname } from "@/slice/selectedSlice";
import { getStringPathname } from "@/helpers/getStringPathname";
import { extractName } from "@/helpers/exctractWarehouseNameFromStatus";

const moduleName = (value) => {
  if (value === "auto") {
    return "авто";
  } else if (value === "spec") {
    return "самоход";
  }
};

const createExcel = (rows, headCells, module, title) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet(`Лист 1`);

  const createColumns = (headCells) => {
    const columns = headCells.map((headCell) => ({
      header: headCell.label,
      key: headCell.id,
      width: 40,
    }));
    return columns;
  };

  worksheet.columns = createColumns(headCells);

  rows?.forEach((row, index) => {
    worksheet.addRow(row);
  });

  // Style the cells
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.font = {
        name: "Times New Roman",
        family: 4,
        size: 12,
        bold: true,
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFFFF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  worksheet.spliceRows(1, 0, [title]);

  worksheet.mergeCells("A1:H1");

  const titleRow = worksheet.getCell("A1");
  titleRow.value = `${title}`;
  titleRow.font = {
    name: "Arial",
    size: 24,
    bold: true,
  };
  titleRow.alignment = { horizontal: "center", vertical: "middle" };
  titleRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFDDDDDD" },
  };
  titleRow.border = {
    top: { style: "thin" },
    bottom: { style: "thin" },
  };

  // Set row height
  worksheet.eachRow((row) => {
    row.height = 30;
  });

  return workbook;
};

const downloadExcel = (workbook, title) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.xlsx`;
    link.click();
  });
};

const ExcelPreviewModal = ({
  rows,
  headCells,
  dateRange = null,
  onClose,
  startDate = null,
  endDate = null,
}) => {
  const [excelData, setExcelData] = useState(null);
  const [workbook, setWorkbook] = useState(null);
  const [worksheets, setWorksheets] = useState([]);
  const [selectedWorksheet, setSelectedWorksheet] = useState(null);

  const myModule = useSelector(selectMyModule);

  const pathname = useSelector(selectPathname);
  const type = getStringPathname(pathname);

  let filteredRows = [...rows];

  if (startDate && endDate) {
    filteredRows = rows.filter((basket) => {
      const basketDate = new Date(basket.createdAt);
      return (
        basketDate >= new Date(startDate) && basketDate <= new Date(endDate)
      );
    });
  }

  let warehouse = "";

  if (rows[0]?.warehouse_statuses) {
    warehouse = extractName(
      rows[0]?.warehouse_statuses[rows[0].warehouse_statuses?.length - 1]
    );
  }

  const title = `Все ${type} ${warehouse} ${moduleName(myModule)} ${
    startDate instanceof Date ? startDate.toLocaleDateString("ru-RU") : ""
  } - ${endDate instanceof Date ? endDate.toLocaleDateString("ru-RU") : ""}`;

  useEffect(() => {
    const initWorkbook = createExcel(filteredRows, headCells, myModule, title);
    setWorkbook(initWorkbook);
    setWorksheets(initWorkbook.worksheets);
    setSelectedWorksheet(initWorkbook.worksheets[0]);
  }, [rows, headCells, myModule, dateRange]);

  const handleDownload = () => {
    if (workbook) {
      downloadExcel(workbook, title);
    }
  };

  const handleWorksheetChange = (event) => {
    const selectedSheetId = event.target.value;
    const selectedSheet = worksheets.find(
      (sheet) => sheet.id === selectedSheetId
    );
    setSelectedWorksheet(selectedSheet);
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      scroll={"paper"}
      maxWidth="xl"
      fullWidth
    >
      <div
        className="mb-4"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <DialogTitle id="scroll-dialog-title">Предпросмотр</DialogTitle>
        <Button
          variant="contained"
          onClick={handleDownload}
          sx={{ mt: 2, mr: 2 }}
        >
          Скачать Excel
        </Button>
      </div>

      <DialogContent dividers={scroll === "paper"}>
        {workbook && Array.isArray(worksheets) && worksheets.length > 0 && (
          <div>
            <FormControl sx={{ width: "500px" }}>
              <InputLabel id="worksheet-label">Лист</InputLabel>
              <Select
                defaultValue={worksheets[0].id}
                onChange={handleWorksheetChange}
                label={"Лист"}
              >
                {worksheets.map((sheet, index) => (
                  <MenuItem key={sheet.id} value={sheet.id}>
                    {sheet.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedWorksheet && (
              <>
                <table className="excel-table">
                  <tbody>
                    {selectedWorksheet._rows.slice(1).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {selectedWorksheet.columns?.map(
                          (column, columnIndex) => (
                            <td key={columnIndex}>
                              {row.getCell(column.key).value}
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExcelPreviewModal;
