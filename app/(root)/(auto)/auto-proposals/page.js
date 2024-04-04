import { LinearProgress } from "@mui/material";

import dynamic from "next/dynamic";

const DynamicProposalsTable = dynamic(
  () => import("@/components/proposals/proposalsTable/proposalsTable"),
  {
    loading: () => <LinearProgress />,
  }
);

export default function ProposalsPage() {
  return <DynamicProposalsTable />;
}
