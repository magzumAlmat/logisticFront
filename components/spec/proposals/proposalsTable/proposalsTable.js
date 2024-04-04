"use client";

import DataTable from "@/shared/table/table";
import ProposalsHeader from "../proposalsHeader/proposalsHeader";
import { useEffect, useState } from "react";
import { rows, headCellsSpec, formatRows } from "@/data/proposals";
import {
  useDeleteSpecProposalMutation,
  useGetAllSpecProposalsQuery,
} from "@/services/specProposalsService";
import Button from "@/shared/button/button";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const groupByOptions = [
  {
    value: "all",
    text: "Активные",
  },
  {
    value: "В работе",
    text: "В работе",
  },
  {
    value: "Согласован",
    text: "Согласован",
  },
  {
    value: "Внимание",
    text: "Внимание",
  },
];

export default function ProposalsTable() {
  const [groupBy, setGroupBy] = useState("all");
  const [selectedColumns, setSelectedColumns] = useState(function () {
    const columnsLocal = JSON.parse(
      localStorage.getItem("columnsSpecProposals")
    );
    if (columnsLocal) {
      return columnsLocal;
    } else {
      return headCellsSpec.filter((cell) => cell.id !== "warehouse_statuses");
    }
  });
  const [search, setSearch] = useState("");

  const { data, refetch } = useGetAllSpecProposalsQuery(search, {
    pollingInterval: 300000,
  });
  const [deleteProposal] = useDeleteSpecProposalMutation();

  let title = "";
  switch (groupBy) {
    case "all":
      title = "Все активные заявки";
      break;
    case "В работе":
      title = "В работе";
      break;
    case "Согласован":
      title = "Согласован";
      break;
    case "Внимание":
      title = "Внимание";
      break;
    default:
      title = "Все";
  }

  const router = useRouter();

  const handleColumnChange = (selectedColumns) => {
    setSelectedColumns(selectedColumns);
    localStorage.setItem(
      "columnsSpecProposals",
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
        <ProposalsHeader
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          options={groupByOptions}
          allColumns={headCellsSpec}
          selectedColumns={selectedColumns}
          handleColumnChange={handleColumnChange}
          search={search}
          setSearch={setSearch}
          rows={formatRows(data.proposals, groupBy)}
          headCells={headCellsSpec}
        />
      )}

      {data?.proposals && (
        <DataTable
          rows={formatRows(data.proposals, groupBy)}
          headCells={selectedColumns}
          title={title}
          renderActions={cellButtons}
          moveToWarehouse={true}
          exportToExcel={true}
        />
      )}
    </>
  );
}
