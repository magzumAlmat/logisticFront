"use client";

import NewBasketForm from "@/components/basket/newBasketForm";
import { useGetBasketQuery } from "@/services/basketService";
import { Alert } from "@mui/material";
import { useEffect } from "react";

function Page({ params }) {
  const { data, refetch } = useGetBasketQuery(params.id);

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
