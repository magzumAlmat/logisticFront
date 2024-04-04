import BasketTable from "@/components/basket/basketTable";
import dynamic from "next/dynamic";
import { LinearProgress } from "@mui/material";

const DynamicBasketTable = dynamic(
  () => import("@/components/basket/basketTable"),
  {
    loading: () => <LinearProgress />,
  }
);

function page() {
  return <DynamicBasketTable />;
}

export default page;
