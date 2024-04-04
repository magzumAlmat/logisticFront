"use client";
import Heading from "@/shared/heading/heading";
import SearchBar from "@/shared/search/search";
import styles from "@/components/componentsheader.module.css";
import ExcelExport from "@/shared/excelExport/excelExport";
import ButtonGroup from "@/shared/buttonToggleGroup/buttonToggleGroup";
import MultipleSelectCheckmarks from "@/shared/checkMarkSelect/checkMarkSelect";

export default function CompaniesHeader({
  groupBy,
  setGroupBy,
  options,
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
        <Heading
          text="Загрузочные листы (самоход\спецтехника)"
          level={2}
          className="mb-3"
        />
        <ExcelExport
          custom={true}
          pathname={"basket"}
          rows={rows}
          headCells={headCells}
        />
      </div>
      <ButtonGroup
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        options={options}
      />
      <div className={styles.actions}>
        <div></div>
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
