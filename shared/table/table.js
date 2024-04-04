"use client";

import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {
  ClipboardList,
  Delete,
  Download,
  ListFilter,
  Sheet,
  Warehouse,
} from "lucide-react";

import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectMyModule } from "@/slice/moduleSlice";
import {
  selectSelectedToExport,
  setSelected,
  setSelectedToExport,
} from "@/slice/selectedSlice";
import ExcelPreviewModal from "@/components/loadingListExcel/preview";
import ProposalExcelLocal from "@/components/proposalExcelLocal/preview";

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData(1, "Cupcake", 305, 3.7, 67, 4.3),
  createData(2, "Donut", 452, 25.0, 51, 4.9),
  createData(3, "Eclair", 262, 16.0, 24, 6.0),
  createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
  createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
  createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
  createData(9, "KitKat", 518, 26.0, 65, 7.0),
  createData(10, "Lollipop", 392, 0.2, 98, 0.0),
  createData(11, "Marshmallow", 318, 0, 81, 2.0),
  createData(12, "Nougat", 360, 19.0, 9, 37.0),
  createData(13, "Oreo", 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  const valueA = a[orderBy];
  const valueB = b[orderBy];

  // Для чисел в виде строк
  if (!isNaN(valueA) && !isNaN(valueB)) {
    const numA = parseFloat(valueA);
    const numB = parseFloat(valueB);
    return numB - numA;
  }

  // Для буквенных значений
  if (valueA && valueB && isNaN(valueA) && isNaN(valueB)) {
    return valueB.localeCompare(valueA);
  }

  // Для дат
  if (Date.parse(valueA) && Date.parse(valueB)) {
    const dateA = new Date(valueA);
    const dateB = new Date(valueB);
    return dateB - dateA;
  }

  // Если тип данных не определен, возвращаем 0
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    renderActions = (row) => <></>,
    select,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      sx={{
        backgroundColor: "#D1E0FF",
      }}
    >
      <TableRow>
        {select && (
          <TableCell padding="checkbox" sx={{ border: "1px solid #999" }}>
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all",
              }}
            />
          </TableCell>
        )}

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              fontWeight: 600,
              border: "1px solid #999",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {renderActions && (
          <TableCell sx={{ fontWeight: 600, border: "1px solid #999" }}>
            Действия
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, title, selected, rows, headCells } = props;
  const { moveToBasket, moveToWarehouse, exportToExcel, loadingList } = props;

  const [isPreview, setIsPreview] = React.useState(false);
  const [isProposalPreview, setIsProposalPreview] = React.useState(false);

  const myModule = useSelector(selectMyModule);
  const router = useRouter();

  const dispatch = useDispatch();

  const selectedRowsWithData = React.useMemo(() => {
    return selected.map((id) => {
      return rows.find((item) => item.id === id);
    });
  }, [selected, rows]);

  const handleMoveToWarehouse = () => {
    dispatch(setSelected(selected));
    router.push(`/${myModule}-warehouses/move`);
  };

  const handleBasket = () => {
    dispatch(setSelected(selected));
    router.push(`/${myModule}-basket/new`);
  };

  const openPreview = () => {
    setIsPreview(true);
  };

  const closePreview = () => {
    setIsPreview(false);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Typography color="inherit" variant="subtitle1" component="div">
            {numSelected} выбрано
          </Typography>
          {moveToWarehouse && (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Warehouse strokeWidth={1.5} />}
              onClick={handleMoveToWarehouse}
            >
              Отправить на склад
            </Button>
          )}
          {moveToBasket && (
            <Button
              variant="outlined"
              startIcon={<ClipboardList />}
              onClick={handleBasket}
            >
              В загрузочный лист
            </Button>
          )}
          {exportToExcel && (
            <Button
              variant="outlined"
              color="success"
              startIcon={<Sheet />}
              onClick={() => setIsProposalPreview(true)}
            >
              Экспортировать в Excel
            </Button>
          )}
          {loadingList && (
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={openPreview}
            >
              Скачать загрузочный лист
            </Button>
          )}
          {isPreview && (
            <ExcelPreviewModal
              rows={selectedRowsWithData}
              headCells={headCells}
              module={myModule}
              onClose={closePreview}
            />
          )}
          {isProposalPreview && (
            <ProposalExcelLocal
              rows={selectedRowsWithData}
              headCells={headCells}
              onClose={() => setIsProposalPreview(false)}
              module={myModule}
            />
          )}
        </div>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const EnchancedTable = React.memo(function EnhancedTable({
  rows = [],
  headCells,
  title,
  renderActions = false,
  handleEdit = () => {},
  handleDelete = () => {},
  disabledRows = [],
  moveToWarehouse = false,
  moveToBasket = false,
  exportToExcel = false,
  loadingList = false,
  select = true,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(2000);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={title}
          moveToBasket={moveToBasket}
          moveToWarehouse={moveToWarehouse}
          exportToExcel={exportToExcel}
          selected={selected}
          rows={rows}
          loadingList={loadingList}
          headCells={headCells}
        />

        <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
          <Table aria-labelledby="tableTitle" size={"small"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
              renderActions={renderActions}
              select={select}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        row.proposal_status === "В работе"
                          ? "#FEEAA8"
                          : row.proposal_status === "Внимание"
                          ? "#F48B8B"
                          : "inherit",
                    }}
                  >
                    {select && (
                      <TableCell
                        padding="checkbox"
                        sx={{ border: "1px solid #999" }}
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                    )}

                    {headCells.map((cell) => (
                      <TableCell
                        key={cell.id}
                        align={cell.numeric ? "right" : "left"}
                        sx={{
                          border: "1px solid #999",
                          color:
                            cell.id === "contract"
                              ? row["contract_color"]
                              : cell.id === "accountant_note"
                              ? row["accountant_note_color"]
                              : "inherit",
                          backgroundColor:
                            cell.id === "payment_percent"
                              ? parseFloat(row["payment_percent"]) < 100
                                ? "#EA5050"
                                : "#60C54F"
                              : "inherit",
                        }}
                      >
                        {row[cell.id]}
                      </TableCell>
                    ))}
                    {renderActions && (
                      <TableCell sx={{ border: "1px solid #999" }}>
                        {renderActions(row, handleEdit, handleDelete)}
                        {/* Рендер кнопок для строки */}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[500, 1000, 2000]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Строк на странице:"}
        />
      </Paper>
    </Box>
  );
});

export default EnchancedTable;
