"use client";

import DataTable from "@/shared/table/table";
import BasketHeader from "./basketHeader";
import { useEffect, useState } from "react";
import { rows, headCells, formatRows } from "@/data/basket";
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
import {
  useDeleteBasketMutation,
  useGetAllBasketsQuery,
} from "@/services/basketService";

export default function WarehousesTable() {
  const [selectedColumns, setSelectedColumns] = useState(function () {
    const columnsLocal = JSON.parse(localStorage.getItem("columnsAutoBasket"));
    if (columnsLocal) {
      return columnsLocal;
    } else {
      return headCells;
    }
  });
  const [search, setSearch] = useState("");

  const { data: baskets, refetch } = useGetAllBasketsQuery(search, {
    pollingInterval: 300000,
  });
  const [deleteBasket] = useDeleteBasketMutation();

  const router = useRouter();

  const handleColumnChange = (selectedColumns) => {
    setSelectedColumns(selectedColumns);
    localStorage.setItem("columnsAutoBasket", JSON.stringify(selectedColumns));
  };

  const handleEdit = (e, row) => {
    e.stopPropagation();

    router.push("/auto-basket/" + row.id);
  };

  const handleDelete = async (e, row) => {
    e.stopPropagation();

    const isConfirmed = confirm(
      "Вы уверены, что хотите удалить загрузочный лист?"
    );
    if (!isConfirmed) {
      return;
    }
    await deleteBasket(row.id);
    refetch();
  };

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
      {baskets && (
        <BasketHeader
          allColumns={headCells}
          selectedColumns={selectedColumns}
          handleColumnChange={handleColumnChange}
          search={search}
          setSearch={setSearch}
          rows={formatRows(baskets.baskets)}
          headCells={selectedColumns}
        />
      )}

      {baskets && (
        <DataTable
          rows={formatRows(baskets.baskets)}
          headCells={selectedColumns}
          title={"Все"}
          renderActions={cellButtons}
          loadingList={true}
        />
      )}
    </>
  );
}
