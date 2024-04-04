import BasketTable from "@/components/spec/basket/basketTable";
import dynamic from "next/dynamic";
import { LinearProgress } from "@mui/material";

const DynamicBasketTable = dynamic(
  () => import("@/components/spec/basket/basketTable"),
  {
    loading: () => <LinearProgress />,
  }
);

function page() {
  return <DynamicBasketTable />;
}

export default page;
