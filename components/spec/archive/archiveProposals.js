"use client";

import DataTable from "@/shared/table/table";
import ArchiveHeader from "./archiveHeader";
import { useEffect, useState } from "react";
import { rows, archiveCells, formatRows } from "@/data/proposals";
import {
  useDeleteSpecProposalMutation,
  useGetAllSpecProposalsQuery,
  useGetArchivedSpecProposalsQuery,
} from "@/services/specProposalsService";
import Button from "@/shared/button/button";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProposalsTable() {
  const [selectedColumns, setSelectedColumns] = useState(function () {
    const columnsLocal = JSON.parse(localStorage.getItem("columnsSpecArchive"));
    if (columnsLocal) {
      return columnsLocal;
    } else {
      return archiveCells;
    }
  });
  const [search, setSearch] = useState("");

  const { data, refetch } = useGetArchivedSpecProposalsQuery(search, {
    pollingInterval: 300000,
  });
  const [deleteProposal] = useDeleteSpecProposalMutation();

  const router = useRouter();

  const handleColumnChange = (selectedColumns) => {
    setSelectedColumns(selectedColumns);
    localStorage.setItem("columnsSpecArchive", JSON.stringify(selectedColumns));
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
        <ArchiveHeader
          allColumns={archiveCells}
          selectedColumns={selectedColumns}
          handleColumnChange={handleColumnChange}
          search={search}
          setSearch={setSearch}
          rows={formatRows(data.proposals, "all", "archived")}
          headCells={selectedColumns}
        />
      )}

      {data?.proposals && (
        <DataTable
          rows={formatRows(data.proposals, "all", "archived")}
          headCells={selectedColumns}
          title={"Архив заявок"}
          renderActions={cellButtons}
          exportToExcel={true}
          archive={true}
        />
      )}
    </>
  );
}
