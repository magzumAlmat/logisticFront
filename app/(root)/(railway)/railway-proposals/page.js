import { LinearProgress } from "@mui/material";
import dynamic from "next/dynamic";

const DynamicProposalsTable = dynamic(
  () => import("@/components/railway/proposals/ProposalsTable"),
  {
    loading: () => <LinearProgress />,
  }
);

function page() {
  return <DynamicProposalsTable />;
}

export default page;
