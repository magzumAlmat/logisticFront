"use client";
import SelectedProposals from "@/components/selectedProposals/selectedProposals";
import { selectProposals } from "@/slice/proposalSlice";
import { selectSelected } from "@/slice/selectedSlice";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import NewBasketForm from "@/components/basket/newBasketForm";

function Page() {
  const selected = useSelector(selectSelected);
  const proposals = useSelector(selectProposals);

  const selectedProposals = proposals.filter((proposal) =>
    selected.includes(proposal.id)
  );

  return (
    <div>
      {selected.length > 0 ? (
        <SelectedProposals
          selectedProposals={selectedProposals}
          proposals={proposals}
        />
      ) : (
        <Alert severity="error">Ничего не выбрано</Alert>
      )}
      <Alert severity="info">У заявок должны быть фактические данные</Alert>
      <NewBasketForm selectedIds={selected} />
    </div>
  );
}

export default Page;
