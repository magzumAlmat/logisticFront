"use client";

import DataTable from "@/shared/table/table";
import WarehousesHeader from "./warehousesHeader";
import { useEffect, useState } from "react";
import { headCellsSpec, formatRows } from "@/data/proposals";
import { useGetAllSpecWarehousesQuery } from "@/services/specWarehouseService";
import Button from "@/shared/button/button";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { selectProposals } from "@/slice/proposalSlice";
import { useSelector } from "react-redux";
import {
  useDeleteSpecProposalMutation,
  useGetAllSpecProposalsQuery,
} from "@/services/specProposalsService";

export default function WarehousesTable() {
  const [groupBy, setGroupBy] = useState("all");
  const [selectedColumns, setSelectedColumns] = useState(function () {
    const columnsLocal = JSON.parse(
      localStorage.getItem("columnsSpecWarehouses")
    );
    if (columnsLocal) {
      return columnsLocal;
    } else {
      return headCellsSpec;
    }
  });
  const [search, setSearch] = useState("");
  const [groupByOptions, setGroupByOptions] = useState([]);

  const { data, refetch } = useGetAllSpecProposalsQuery(search, {
    pollingInterval: 300000,
  });
  const [deleteProposal] = useDeleteSpecProposalMutation();

  const { data: warehouses, refetch: refetchWarehouses } =
    useGetAllSpecWarehousesQuery();

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
      "columnsSpecWarehouses",
      JSON.stringify(selectedColumns)
    );
  };

  const handleEdit = (e, row) => {
    e.stopPropagation();

    router.push("/spec-proposals/" + row.id);
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
      {data?.proposals && (
        <WarehousesHeader
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          options={groupByOptions}
          allColumns={headCellsSpec}
          selectedColumns={selectedColumns}
          handleColumnChange={handleColumnChange}
          search={search}
          setSearch={setSearch}
          rows={formatRows(data.proposals, groupBy, groupBy)}
          headCells={selectedColumns}
        />
      )}

      {data?.proposals && (
        <DataTable
          rows={formatRows(data.proposals, groupBy, groupBy)}
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
