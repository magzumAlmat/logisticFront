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

const moduleName = (value) => {
  if (value === "auto") {
    return "авто";
  } else if (value === "spec") {
    return "самоход";
  } else if (value === "railway") {
    return "ЖД";
  }
};

const createExcel = (rows, headCells, module, startDate, endDate) => {
  const workbook = new ExcelJS.Workbook();

  const proposaNumbers = rows.map((row) => row.proposal_number).join(", ");
  const dates = rows
    .map((row) => new Date(row.createdAt).toLocaleDateString())
    .join(", ");

  const worksheet = workbook.addWorksheet(
    `№${proposaNumbers} ${rows.length > 1 ? "заявки" : "заявка"} ${
      rows.length === 1 ? rows[0].cargo_name : ""
    } ${moduleName(module)} ${dates}`
  );

  // const createColumns = (headCells) => {
  //   const columns = headCells.map((headCell) => ({
  //     header: headCell.label,
  //     key: headCell.id,
  //     width: 40,
  //   }));
  //   return columns;
  // };

  worksheet.columns = [
    { header: "№", key: "index", width: 40 },
    {
      header: "Адрес отправления",
      key: "location_from",
      width: 40,
    },
    {
      header: "Контакты отправителя",
      key: "contacts",
      width: 40,
    },
    {
      header: "Характер груза",
      key: "cargo_name",
      width: 40,
    },
    {
      header: "Кол-во мест, ед",
      key: "quantity",
      width: 40,
    },
    {
      header: "Вес, кг",
      key: "weight",
      width: 40,
    },
    {
      header: "Объем, м3",
      key: "volume",
      width: 40,
    },
    {
      header: "Размер ДШВ",
      key: "dshv",
      width: 40,
    },
    {
      header: "Получатель",
      key: "client_name",
      width: 40,
    },
  ];

  rows?.forEach((row, index) => {
    const contacts = `${row.company?.address || row.sender?.address}`;

    let quantity = row.actual_quantity
      ? row.actual_quantity
      : row.declared_quantity;

    if (quantity === undefined) quantity = row.quantity;

    let weight = row.actual_weight ? row.actual_weight : row.declared_weight;
    if (weight === undefined) {
      weight = row.weight;
    }
    let volume = row.actual_volume ? row.actual_volume : row.declared_volume;
    if (volume === undefined) {
      volume = row.volume;
    }
    let dshv = row.actual_dshv ? row.actual_dshv : row.declared_dshv;
    if (dshv === undefined) dshv = "Нет";

    const clientName = row.client.company_name;

    worksheet.addRow({
      index: index + 1,
      location_from: row.location_from || row.route,
      contacts: contacts,
      cargo_name: row.cargo_name,
      quantity: quantity,
      weight: weight,
      volume: volume,
      dshv: dshv,
      client_name: clientName,
    });
  });

  const title = `№${proposaNumbers} ${rows.length > 1 ? "заявки" : "заявка"} ${
    rows.length === 1 ? rows[0].cargo_name : ""
  } ${moduleName(module)} ${dates}`;

  worksheet.spliceRows(1, 0, [title]);

  worksheet.mergeCells("A1:H1");

  // Style the cells
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.font = {
        name: "Arial",
        family: 4,
        size: 12,
        bold: true,
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFDDDDDD" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

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
  });

  // Set row height
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.height = 50;
    } else if (rowNumber === 2) {
      row.height = 30;
    } else {
      row.height = 70;
    }
  });

  return workbook;
};

const downloadExcel = (workbook, rows, module) => {
  const proposaNumbers = rows.map((row) => row.proposal_number).join(", ");
  const dates = rows
    .map((row) => new Date(row.createdAt).toLocaleDateString())
    .join(", ");

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `№${proposaNumbers} ${
      rows.length > 1 ? "заявки" : "заявка"
    } ${rows.length === 1 ? rows[0].cargo_name : ""} ${moduleName(
      module
    )} ${dates} .xlsx`;
    link.click();
  });
};

const ExcelPreviewModal = ({
  rows,
  headCells,
  module,
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

  let filteredRows = [...rows];

  if (startDate && endDate) {
    filteredRows = rows.filter((basket) => {
      const basketDate = new Date(basket.createdAt);
      return (
        basketDate >= new Date(startDate) && basketDate <= new Date(endDate)
      );
    });
  }

  useEffect(() => {
    const initWorkbook = createExcel(
      filteredRows,
      headCells,
      myModule,
      startDate,
      endDate
    );
    setWorkbook(initWorkbook);
    setWorksheets(initWorkbook.worksheets);
    setSelectedWorksheet(initWorkbook.worksheets[0]);
  }, [rows, headCells, myModule, dateRange]);

  const handleDownload = () => {
    if (workbook) {
      downloadExcel(workbook, filteredRows, myModule);
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
