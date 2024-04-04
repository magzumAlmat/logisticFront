import WarehousesTable from "@/components/spec/warehouses/warehouseTable";
import dynamic from "next/dynamic";
import { LinearProgress } from "@mui/material";

const DynamicWarehousesTable = dynamic(
  () => import("@/components/spec/warehouses/warehouseTable"),
  {
    loading: () => <LinearProgress />,
  }
);

function page() {
  return <DynamicWarehousesTable />;
}

export default page;
