import { LinearProgress } from "@mui/material";
import React from "react";
import { useCurrentQuery } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function WithAuth({ children }) {
  // Вызываем хук useCurrentQuery для получения текущего пользователя
  const { isError, isLoading, isSuccess } = useCurrentQuery();

  const router = useRouter();

  // Если пользователь не зарегистрирован, редиректим на страницу логина
  if (isLoading) {
    return <LinearProgress />;
  } else if (isError) {
    router.push("/login");
    return null;
  }

  if (isSuccess) {
    return <>{children}</>;
  } else {
    router.push("/login");
    return null;
  }
}
