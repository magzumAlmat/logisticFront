import ProposalsTable from "@/components/spec/proposals/proposalsTable/proposalsTable";
import dynamic from "next/dynamic";
import { LinearProgress } from "@mui/material";

const DynamicProposalsTable = dynamic(
  () => import("@/components/spec/proposals/proposalsTable/proposalsTable"),
  {
    loading: () => <LinearProgress />,
  }
);

export default function ProposalsPage() {
  return <DynamicProposalsTable />;
}
