"use client";

import DataTable from "@/shared/table/table";
import WarehousesHeader from "./warehousesHeader";
import { useEffect, useState } from "react";
import { rows, headCells, formatRows } from "@/data/proposals";
import {
  useDeleteProposalMutation,
  useGetAllProposalsQuery,
} from "@/services/proposalsService";
import { useGetAllWarehousesQuery } from "@/services/warehouseService";
import Button from "@/shared/button/button";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { selectProposals } from "@/slice/proposalSlice";
import { useSelector } from "react-redux";

export default function WarehousesTable() {
  const [groupBy, setGroupBy] = useState("all");
  const [selectedColumns, setSelectedColumns] = useState(function () {
    const columnsLocal = JSON.parse(
      localStorage.getItem("columnsAutoWarehouses")
    );
    if (columnsLocal) {
      return columnsLocal;
    } else {
      return headCells;
    }
  });
  const [search, setSearch] = useState("");
  const [groupByOptions, setGroupByOptions] = useState([]);

  const { data, refetch } = useGetAllProposalsQuery(search, {
    pollingInterval: 300000,
  });
  const [deleteProposal] = useDeleteProposalMutation();

  const { data: warehouses, refetch: refetchWarehouses } =
    useGetAllWarehousesQuery();

  useEffect(() => {
    if (warehouses && warehouses.length > 0) {
      const options = warehouses.map((warehouse) => ({
        text: warehouse.warehouse_name,
        value: warehouse.warehouse_name,
      }));

      setGroupByOptions(options);
      setGroupBy(options[0]?.value || "all");
    }
  }, [warehouses]);

  const proposals = useSelector(selectProposals);

  let title = "";
  switch (groupBy) {
    case "all":
      title = "Все активные заявки";
      break;
    default:
      const selectedOption = groupByOptions.find(
        (option) => option.value === groupBy
      );
      title = selectedOption ? selectedOption.text : "Все";
  }

  const router = useRouter();

  const handleColumnChange = (selectedColumns) => {
    setSelectedColumns(selectedColumns);
    localStorage.setItem(
      "columnsAutoWarehouses",
      JSON.stringify(selectedColumns)
    );
  };

  const handleEdit = (e, row) => {
    e.stopPropagation();

    router.push("/auto-proposals/" + row.id);
  };

  const handleDelete = async (e, row) => {
    e.stopPropagation();

    const isConfirmed = confirm("Вы уверены, что хотите удалить заявку?");
    if (!isConfirmed) {
      return;
    }
    await deleteProposal(row.id);
    refetch();
  };

  useEffect(() => {
    refetchWarehouses();
    refetch();
  }, [refetchWarehouses, refetch]);

  const cellButtons = (row) => {
    return (
      <div className="flex">
        <Button
          icon={<Edit />}
          tooltipTitle="Редактировать"
          onClick={(e) => handleEdit(e, row)}
        />
        <Button
          icon={<Trash2 />}
          tooltipTitle="Удалить"
          onClick={(e) => handleDelete(e, row)}
        />
      </div>
    );
  };

  useEffect(() => {
    refetch();
  }, [refetch, search]);

  return (
    <>
      <WarehousesHeader
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        options={groupByOptions}
        allColumns={headCells}
        selectedColumns={selectedColumns}
        handleColumnChange={handleColumnChange}
        search={search}
        setSearch={setSearch}
        rows={formatRows(proposals, groupBy, groupBy)}
        headCells={selectedColumns}
      />

      {proposals && (
        <DataTable
          rows={formatRows(proposals, groupBy, groupBy)}
          headCells={selectedColumns}
          title={title}
          renderActions={cellButtons}
          moveToWarehouse={true}
          moveToBasket={true}
          exportToExcel={true}
        />
      )}
    </>
  );
}
