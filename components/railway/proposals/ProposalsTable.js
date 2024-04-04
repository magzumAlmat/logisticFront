"use client";

import DataTable from "@/shared/table/table";
import ProposalsHeader from "./ProposalsHeader";
import { useEffect, useState } from "react";
import { headCells, formatRows } from "@/data/railwayProposals";
import {
  useDeleteRailwayProposalMutation,
  useGetAllRailwayProposalsQuery,
} from "@/services/railwayProposalsService";
import Button from "@/shared/button/button";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProposalsTable() {
  const [selectedColumns, setSelectedColumns] = useState(function () {
    const columnsLocal = JSON.parse(
      localStorage.getItem("columnsRailwayProposals")
    );
    if (columnsLocal) {
      return columnsLocal;
    } else {
      return headCells;
    }
  });
  const [search, setSearch] = useState("");

  const { data, refetch } = useGetAllRailwayProposalsQuery(search, {
    pollingInterval: 300000,
  });
  const [deleteProposal] = useDeleteRailwayProposalMutation();

  let title = "Все заявки ЖД";

  const router = useRouter();

  const handleColumnChange = (selectedColumns) => {
    setSelectedColumns(selectedColumns);
    localStorage.setItem(
      "columnsRailwayProposals",
      JSON.stringify(selectedColumns)
    );
  };

  const handleEdit = (e, row) => {
    e.stopPropagation();

    router.push("/railway-proposals/" + row.id);
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
      <ProposalsHeader
        allColumns={headCells}
        selectedColumns={selectedColumns}
        handleColumnChange={handleColumnChange}
        search={search}
        setSearch={setSearch}
        rows={formatRows(data?.proposals)}
        headCells={headCells}
      />

      {data?.proposals && (
        <DataTable
          rows={formatRows(data.proposals)}
          headCells={selectedColumns}
          title={title}
          renderActions={cellButtons}
          exportToExcel={true}
        />
      )}
    </>
  );
}
