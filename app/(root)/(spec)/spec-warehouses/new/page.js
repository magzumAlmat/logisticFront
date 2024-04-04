"use client";

import { useAddSpecWarehouseMutation } from "@/services/specWarehouseService";

import Button from "@/shared/button/button";
import Heading from "@/shared/heading/heading";
import { Alert, TextField } from "@mui/material";
import { useState } from "react";

function Page() {
  const [form, setForm] = useState({ warehouse_name: "" });

  const [addWarehouse, { isLoading, isSuccess, isError, error }] =
    useAddSpecWarehouseMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addWarehouse(form);
    if (res.data) {
      setForm({ warehouse_name: "" });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Heading text="Новый склад (самоход)" level={2} className="mb-3" />
      <TextField
        required
        id="outlined-error-helper-text"
        label="Название склада"
        defaultValue={form.warehouse_name}
        onChange={(e) => setForm({ ...form, warehouse_name: e.target.value })}
      />
      {error && <Alert severity="error">{error?.data?.message}</Alert>}
      {isSuccess && <Alert severity="success">Склад добавлен</Alert>}

      <Button type="submit">Добавить</Button>
    </form>
  );
}

export default Page;
