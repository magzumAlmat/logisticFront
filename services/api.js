import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",

  // Добавляем к каждому запросу токен
  prepareHeaders: (headers, { getState, url, method }) => {
    const token = getState().auth.user?.token || localStorage.getItem("token");

    if (token && token !== null && token !== undefined) {
      headers.append("Authorization", `Bearer ${token}`);
    } else {
      console.log("no token");
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  // Сюда будут добавляться эндпоинты
  endpoints: () => ({}),
});
