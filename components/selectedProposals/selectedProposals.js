import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const total_quantity = (proposals) => {
  let total = 0;
  proposals.forEach((proposal) => {
    total += parseFloat(proposal.actual_quantity);
  });
  return total;
};

const total_weight = (proposals) => {
  let total = 0;
  proposals.forEach((proposal) => {
    total += parseFloat(proposal.actual_weight);
  });
  return total;
};

const total_volume = (proposals) => {
  let total = 0;
  proposals.forEach((proposal) => {
    total += parseFloat(proposal.actual_volume);
  });
  return total;
};

export default function SelectedProposals({ selectedProposals, spec = false }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Номер заявки</TableCell>
            <TableCell>Получатель</TableCell>
            <TableCell>Название груза</TableCell>
            <TableCell>Откуда</TableCell>
            <TableCell>Куда</TableCell>
            <TableCell>Кол-во мест, ед (фактич.)</TableCell>
            <TableCell>Вес, кг (фактич.)</TableCell>
            {!spec && <TableCell>Объем, м3 (фактич.)</TableCell>}
            {spec && <TableCell>Размер ДШВ (фактич.)</TableCell>}
            <TableCell>Склад (на данный момент)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedProposals?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.proposal_number}</TableCell>
              <TableCell>{row.client.company_name}</TableCell>
              <TableCell>{row.cargo_name}</TableCell>
              <TableCell>{row.location_from}</TableCell>
              <TableCell>{row.location_to}</TableCell>
              <TableCell>
                {row.actual_quantity || "Нет фактических данных"}
              </TableCell>
              <TableCell>
                {row.actual_weight || "Нет фактических данных"}
              </TableCell>
              {!spec && (
                <TableCell>
                  {row.actual_volume || "Нет фактических данных"}
                </TableCell>
              )}
              {spec && (
                <TableCell>
                  {row.actual_dshv || "Нет фактических данных"}
                </TableCell>
              )}

              <TableCell>
                {row.warehouse_statuses.length > 0
                  ? `${
                      row.warehouse_statuses[row.warehouse_statuses.length - 1]
                        ?.warehouse?.warehouse_name
                    } ${new Date(
                      row.warehouse_statuses[
                        row.warehouse_statuses.length - 1
                      ]?.date
                    ).toLocaleDateString()}`
                  : "Не в складе"}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            {selectedProposals?.length > 0 && (
              <>
                {" "}
                <TableCell>{total_quantity(selectedProposals)}</TableCell>
                <TableCell>{total_weight(selectedProposals)}</TableCell>
                {!spec && (
                  <TableCell>{total_volume(selectedProposals)}</TableCell>
                )}
                {spec && <TableCell></TableCell>}
              </>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
