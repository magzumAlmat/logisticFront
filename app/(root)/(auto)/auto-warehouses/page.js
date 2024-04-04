import WarehousesTable from "@/components/warehouses/warehouseTable";
import dynamic from "next/dynamic";
import { LinearProgress } from "@mui/material";

const DynamicWarehousesTable = dynamic(
  () => import("@/components/warehouses/warehouseTable"),
  {
    loading: () => <LinearProgress />,
  }
);

function page() {
  return <DynamicWarehousesTable />;
}

export default page;
