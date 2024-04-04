import ArchiveProposals from "@/components/archive/archiveProposals";
import dynamic from "next/dynamic";
import { LinearProgress } from "@mui/material";

const DynamicArchiveProposals = dynamic(
  () => import("@/components/archive/archiveProposals"),
  {
    loading: () => <LinearProgress />,
  }
);

function Page() {
  return <DynamicArchiveProposals />;
}

export default Page;
