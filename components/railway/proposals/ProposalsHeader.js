"use client";
import Heading from "@/shared/heading/heading";
import SearchBar from "@/shared/search/search";
import styles from "@/components/componentsheader.module.css";
import ExcelExport from "@/shared/excelExport/excelExport";
// import ButtonGroup from "@/shared/buttonToggleGroup/buttonToggleGroup";
import { UserPlus } from "lucide-react";
import Button from "@/shared/button/button";
import MultipleSelectCheckmarks from "@/shared/checkMarkSelect/checkMarkSelect";

export default function CompaniesHeader({
  allColumns,
  selectedColumns,
  handleColumnChange,
  search,
  setSearch,
  rows,
  headCells,
}) {
  return (
    <div>
      <div className={styles.header}>
        <Heading text="Заявки ЖД" level={2} className="mb-3" />
        <ExcelExport
          rows={rows}
          headCells={headCells}
          pathname="proposals"
          custom={true}
        />
      </div>
      <div className={styles.actions}>
        <Button
          type="primary"
          icon={<UserPlus />}
          iconColor="white"
          link="/railway-proposals/new"
        >
          Добавить новую заявку ЖД
        </Button>
        <div className={styles.tableSettings}>
          <SearchBar search={search} setSearch={setSearch} />
          <MultipleSelectCheckmarks
            allColumns={allColumns}
            selectedColumns={selectedColumns}
            handleColumnChange={handleColumnChange}
          />
        </div>
      </div>
    </div>
  );
}
