import ArchiveProposals from "@/components/railway/proposals/archiveProposals";
import dynamic from "next/dynamic";
import { LinearProgress } from "@mui/material";

const DynamicArchiveProposals = dynamic(
  () => import("@/components/railway/proposals/archiveProposals"),
  {
    loading: () => <LinearProgress />,
  }
);
function Page() {
  return <DynamicArchiveProposals />;
}

export default Page;
