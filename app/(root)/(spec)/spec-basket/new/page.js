"use client";
import SelectedProposals from "@/components/selectedProposals/selectedProposals";
import { selectSelected } from "@/slice/selectedSlice";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import NewBasketForm from "@/components/spec/basket/newBasketForm";
import { useGetAllSpecProposalsQuery } from "@/services/specProposalsService";

function Page() {
  const selected = useSelector(selectSelected);
  const { data } = useGetAllSpecProposalsQuery("");

  const selectedProposals = data?.proposals?.filter((proposal) =>
    selected.includes(proposal.id)
  );

  return (
    <div>
      {selected.length > 0 && data?.proposals ? (
        <SelectedProposals
          selectedProposals={selectedProposals}
          proposals={data.proposals}
          spec={true}
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
