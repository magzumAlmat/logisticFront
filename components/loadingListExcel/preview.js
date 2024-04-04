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
  }
};

const createExcel = (rows, headCells, module, startDate, endDate) => {
  const workbook = new ExcelJS.Workbook();

  rows?.forEach((row, index) => {
    const worksheet = workbook.addWorksheet(
      `№${row.internal_order_number} ${row.kpp} ${moduleName(module)} ${
        row.arrival_date ? row.arrival_date.slice(-4) : new Date().getFullYear()
      }г`
    );

    if (module === "auto") {
      worksheet.columns = [
        { header: "№", key: "index", width: 5 },
        { header: "№ заявки(КНР)", key: "proposal_number", width: 30 },
        { header: "Получатель", key: "client_name", width: 50 },
        { header: "Наименование груза", key: "cargo_name", width: 60 },
        { header: "Кол-во мест", key: "actual_quantity", width: 25 },
        { header: "Вес", key: "actual_weight", width: 25 },
        { header: "Объем", key: "actual_volume", width: 25 },
        { header: "Номер машины", key: "car_registration_number", width: 60 },
      ];
      row.proposals?.forEach((proposal, proposalIndex) => {
        worksheet.addRow({
          index: proposalIndex + 1,
          proposal_number: proposal.proposal_number,
          client_name: proposal.client.company_name,
          cargo_name: proposal.cargo_name,
          actual_quantity: proposal.actual_quantity,
          actual_weight: proposal.actual_weight,
          actual_volume: proposal.actual_volume,
          car_registration_number: proposal.car_registration_number,
        });
      });

      const totalQuantity = row.proposals.reduce(
        (sum, proposal) => sum + parseFloat(proposal.actual_quantity),
        0
      );
      const totalWeight = row.proposals.reduce(
        (sum, proposal) => sum + parseFloat(proposal.actual_weight),
        0
      );
      const totalVolume = row.proposals.reduce(
        (sum, proposal) => sum + parseFloat(proposal.actual_volume),
        0
      );

      worksheet.addRow({
        index: "",
        proposal_number: "",
        company_name: "",
        cargo_name: "Итого",
        actual_quantity: totalQuantity,
        actual_weight: totalWeight,
        actual_volume: totalVolume,
        car_registration_number: "",
      });
    }

    if (module === "spec") {
      worksheet.columns = [
        { header: "№", key: "index", width: 5 },
        { header: "№ заявки(КНР)", key: "proposal_number", width: 30 },
        { header: "Получатель", key: "client_name", width: 50 },
        { header: "Наименование груза", key: "cargo_name", width: 60 },
        { header: "Кол-во мест", key: "actual_quantity", width: 25 },
        { header: "Вес", key: "actual_weight", width: 25 },
        { header: "Размер ДШВ", key: "actual_dshv", width: 25 },
        { header: "Номер машины", key: "car_registration_number", width: 60 },
      ];
      row.proposals?.forEach((proposal, proposalIndex) => {
        worksheet.addRow({
          index: proposalIndex + 1,
          proposal_number: proposal.proposal_number,
          client_name: proposal.client.company_name,
          cargo_name: proposal.cargo_name,
          actual_quantity: proposal.actual_quantity,
          actual_weight: proposal.actual_weight,
          actual_dshv: proposal.actual_dshv,
          car_registration_number: proposal.car_registration_number,
        });
      });

      const totalQuantity = row.proposals.reduce(
        (sum, proposal) => sum + parseFloat(proposal.actual_quantity),
        0
      );
      const totalWeight = row.proposals.reduce(
        (sum, proposal) => sum + parseFloat(proposal.actual_weight),
        0
      );

      worksheet.addRow({
        index: "",
        proposal_number: "",
        company_name: "",
        cargo_name: "Итого",
        actual_quantity: totalQuantity,
        actual_weight: totalWeight,
        actual_dshv: "",
        car_registration_number: "",
      });
    }

    const titleDate =
      startDate === null
        ? ""
        : `${new Date(startDate).toLocaleDateString()} - ${new Date(
            endDate
          ).toLocaleDateString()}`;

    const title = `Загрузочный лист №${row.internal_order_number} ${
      row.kpp
    } ${moduleName(module)} ${
      row.arrival_date ? row.arrival_date.slice(-4) : new Date().getFullYear()
    }г  ${titleDate}`;

    // Add the title as the first row
    worksheet.spliceRows(1, 0, [title]);

    // Merge cells for the title row
    worksheet.mergeCells("A1:H1");
    const titleRow = worksheet.getCell("A1");
    titleRow.value = `${title}`;
    titleRow.font = {
      name: "Times New Roman",
      size: 14,
      bold: true,
    };
    titleRow.alignment = { horizontal: "center", vertical: "middle" };
    titleRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" },
    };
    titleRow.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

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

    // Set row height
    worksheet.eachRow((row) => {
      row.height = 30;
    });
  });

  return workbook;
};

const downloadExcel = (workbook, rows, module) => {
  const loadingListNumbers = rows
    .map((row) => {
      return row.internal_order_number;
    })
    .join(", ");

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${
      rows.length === 1 ? "Загрузочный лист" : "Загрузочные листы"
    }№ ${loadingListNumbers} ${rows[0].kpp ? rows[0].kpp : ""} - ${moduleName(
      module
    )} ${new Date().getFullYear()} .xlsx`;
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
                {/* <FormHelperText sx={{ textAlign: "center" }}>
                  Отображение года (пример: авто 2024г) зависит от даты прибытия
                  в загрузочном листе
                </FormHelperText> */}
                <table className="excel-table">
                  <thead>
                    <tr>
                      {selectedWorksheet.columns?.map((column) => (
                        <th
                          key={column.key}
                          style={{ width: `${column.width}px` }}
                        >
                          {column.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedWorksheet._rows.slice(2).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {selectedWorksheet.columns?.map(
                          (column, columnIndex) => (
                            <td key={columnIndex}>
                              {row._cells[columnIndex]._value.model.value}
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
