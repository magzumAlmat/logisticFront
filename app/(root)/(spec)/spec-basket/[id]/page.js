"use client";

import NewBasketForm from "@/components/spec/basket/newBasketForm";
import { useGetSpecBasketQuery } from "@/services/specBasketService";
import { Alert } from "@mui/material";
import { useEffect } from "react";

function Page({ params }) {
  const { data, refetch } = useGetSpecBasketQuery(params.id);

  useEffect(() => {
    refetch();
  }, [params.id, refetch]);

  return (
    <div>
      {data?.basket ? (
        <NewBasketForm basket={data.basket} edit={true} />
      ) : (
        <Alert severity="error">Загрузочный лист не найден</Alert>
      )}
    </div>
  );
}

export default Page;
