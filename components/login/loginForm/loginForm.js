"use client";
import React, { useState } from "react";
import styles from "@/app/login/login.module.css";
import TextField from "@mui/material/TextField";
import Button from "@/shared/button/button";
import { useLoginMutation } from "@/services/authService";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loginUser, { isLoading, error }] = useLoginMutation();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(form).unwrap();
    setForm({
      email: "",
      password: "",
    });
    if (result.token) {
      router.push("/companies");
    }
  };

  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <TextField
        required
        label="Почта"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <TextField
        required
        label="Пароль"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      {error && <Alert severity="error">{error.data.error}</Alert>}
      <Button className="w-full" type="submit">
        {isLoading ? "Загрузка..." : "Войти"}
      </Button>
    </form>
  );
}
