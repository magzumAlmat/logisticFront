"use client";

import DataTable from "@/shared/table/table";
import CompaniesHeader from "../companiesHeader/companiesHeader";
import { useEffect, useState } from "react";
import { rows, headCells, formatRows } from "@/data/companies";
import {
  useDeleteCompanyMutation,
  useGetAllCompaniesQuery,
} from "@/services/companiesService";
import Button from "@/shared/button/button";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCompanies } from "@/slice/companySlice";
import { Alert } from "@mui/material";

const groupByOptions = [
  {
    value: "all",
    text: "Все",
  },
  {
    value: "clients",
    text: "Заказчики",
  },
  {
    value: "executors",
    text: "Исполнители",
  },
];

export default function CompaniesTable() {
  const [groupBy, setGroupBy] = useState("all");
  const [selectedColumns, setSelectedColumns] = useState(function () {
    const columnsLocal = JSON.parse(localStorage.getItem("columnsCompanies"));
    if (columnsLocal) {
      return columnsLocal;
    } else {
      return headCells;
    }
  });
  const [search, setSearch] = useState("");

  const { data, isLoading, refetch } = useGetAllCompaniesQuery(search, {
    pollingInterval: 300000,
  });
  const [deleteCompany, { error }] = useDeleteCompanyMutation();

  const companies = useSelector(selectCompanies);

  let title = "";
  switch (groupBy) {
    case "all":
      title = "Все компании";
      break;
    case "executors":
      title = "Исполнители";
      break;
    case "clients":
      title = "Заказчики";
      break;
    default:
      title = "Все компании";
  }

  const router = useRouter();

  const handleColumnChange = (selectedColumns) => {
    setSelectedColumns(selectedColumns);
    localStorage.setItem("columnsCompanies", JSON.stringify(selectedColumns));
  };

  const handleEdit = (e, row) => {
    e.stopPropagation();

    router.push("/companies/" + row.id);
  };

  const handleDelete = async (e, row) => {
    e.stopPropagation();

    const isConfirmed = confirm("Вы уверены, что хотите удалить компанию?");
    if (!isConfirmed) {
      return;
    }
    await deleteCompany(row.id);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [search, refetch]);

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

  return (
    <>
      {error && (
        <Alert severity="error" className="mb-5">
          Вы пытаетесь удалить компанию, которая используется
        </Alert>
      )}
      {companies && (
        <CompaniesHeader
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          options={groupByOptions}
          allColumns={headCells}
          selectedColumns={selectedColumns}
          handleColumnChange={handleColumnChange}
          search={search}
          setSearch={setSearch}
          rows={formatRows(companies, groupBy)}
          headCells={selectedColumns}
        />
      )}
      {companies && (
        <DataTable
          rows={formatRows(companies, groupBy)}
          headCells={selectedColumns}
          title={title}
          renderActions={cellButtons}
          select={false}
        />
      )}
    </>
  );
}
