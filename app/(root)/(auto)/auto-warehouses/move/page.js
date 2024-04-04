"use client";

import React from "react";
import { useSelector } from "react-redux";
import SelectedProposals from "@/components/selectedProposals/selectedProposals";
import WarehouseForm from "@/components/warehouseForm/warehouseForm";
import Heading from "@/shared/heading/heading";
import { selectSelected } from "@/slice/selectedSlice";
import { selectProposals } from "@/slice/proposalSlice";

export default function Page() {
  const selected = useSelector(selectSelected);
  const proposals = useSelector(selectProposals);

  const selectedProposals = proposals.filter((proposal) =>
    selected.includes(proposal.id)
  );
  return (
    <div>
      {selected.length > 0 && (
        <SelectedProposals
          selectedProposals={selectedProposals}
          proposals={proposals}
        />
      )}
      <WarehouseForm selectedIds={selected} />
    </div>
  );
}
