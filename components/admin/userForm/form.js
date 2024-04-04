"use client";
import {
  useEditUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useResetUserPasswordMutation,
} from "@/services/adminUsersService";
import Button from "@/shared/button/button";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function UserForm({
  user = {},
  onSubmit,
  isReset = false,
  isLoading,
  error,
  isSuccess,
  successMessage,
  buttonTitle,
}) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    role: "",
  });

  const [
    resetPassword,
    { isLoading: resetLoading, isSuccess: resetSuccess, error: resetError },
  ] = useResetUserPasswordMutation();
  const { refetch } = useGetUsersQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: user.id,
      full_name: form.full_name,
      email: form.email,
      role: form.role,
    };
    const res = await onSubmit(data);
    if (res.data) {
      refetch();
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const res = await resetPassword({ id: user.id });
  };

  useEffect(() => {
    if (user.full_name || user.email || user.role) {
      setForm({
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  return (
    <form className="mt-5 form" onSubmit={handleSubmit}>
      <TextField
        required
        error={false}
        id="outlined-error-helper-text"
        label="Полное имя"
        defaultValue={form.full_name}
        helperText={false}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
      />
      <TextField
        required
        error={false}
        id="outlined-error-helper-text"
        label="Почта"
        defaultValue={form.email}
        helperText={false}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Роль</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={form.role}
          label="Age"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <MenuItem value="admin">Администратор</MenuItem>
          <MenuItem value="manager">Менеджер</MenuItem>
          <MenuItem value="accountant">Бухгалтер</MenuItem>
        </Select>
      </FormControl>

      {isSuccess && <Alert severity="success">{successMessage}</Alert>}
      {error && <Alert severity="error">{error.data.error}</Alert>}

      <Button className="w-full" type="submit">
        {isLoading ? "Загрузка..." : buttonTitle}
      </Button>

      {isReset && (
        <>
          {resetSuccess && (
            <Alert severity="success">Пароль успешно сброшен</Alert>
          )}
          {resetError && (
            <Alert severity="error">{resetError.data.error}</Alert>
          )}
          <Button type="outline" onClick={handleReset} className="w-full">
            {resetLoading ? "Загрузка..." : "Сбросить пароль"}
          </Button>
          <Alert severity="info">
            При сбрасывании пароля, новый пароль будет отправлен на указанный
            адрес электронной почты
          </Alert>
        </>
      )}
    </form>
  );
}

export default UserForm;
