import {
  useGetAllWarehousesQuery,
  useMoveProposalsMutation,
} from "@/services/warehouseService";
import Heading from "@/shared/heading/heading";
import SelectLabels from "@/shared/select/select";
import { Alert, TextField } from "@mui/material";
import DatePicker from "@/shared/datePicker/datePicker";
import { useEffect, useState } from "react";
import Button from "@/shared/button/button";

function WarehouseForm({ selectedIds }) {
  const [form, setForm] = useState({
    warehouse_id: "",
    date: null,
  });
  const [options, setOptions] = useState([]);

  const { data: warehouses, refetch: refetchWarehouses } =
    useGetAllWarehousesQuery();
  const [moveProposals, { isSuccess, error, isLoading }] =
    useMoveProposalsMutation();

  useEffect(() => {
    if (warehouses && warehouses.length > 0) {
      const options = warehouses.map((warehouse) => ({
        label: warehouse.warehouse_name,
        value: warehouse.id,
      }));
      setOptions(options);
    }
  }, [warehouses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      proposal_ids: selectedIds,
      ...form,
    };

    const res = await moveProposals(data);
    if (res.data) {
      setForm({ warehouse_id: "", date: null });
      refetchWarehouses();
    }
  };

  return (
    <form className="form mt-5" onSubmit={handleSubmit}>
      <Heading text="Отправить на склад" level={2} className="mb-3" />
      {options.length > 0 ? (
        <SelectLabels
          options={options}
          value={form.warehouse_id}
          onChange={(e) => setForm({ ...form, warehouse_id: e.target.value })}
          label="Склад"
        />
      ) : (
        <Alert severity="error">Склады не найдены</Alert>
      )}
      <DatePicker
        onChange={(date) => setForm({ ...form, date: date })}
        value={form?.date}
        label="Дата"
      />
      {isSuccess && <Alert severity="success">Заявки перемещены</Alert>}
      {error && <Alert severity="error">{error?.data?.message}</Alert>}
      <Button type="submit">
        {isLoading ? "Загрузка..." : "Отправить на склад"}
      </Button>
    </form>
  );
}

export default WarehouseForm;
