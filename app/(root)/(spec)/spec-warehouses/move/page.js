"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SelectedProposals from "@/components/selectedProposals/selectedProposals";
import WarehouseForm from "@/components/spec/warehouses/warehouseForm/warehouseForm";
import { selectSelected } from "@/slice/selectedSlice";
import { useGetAllSpecProposalsQuery } from "@/services/specProposalsService";

export default function Page() {
  const selected = useSelector(selectSelected);
  const { data } = useGetAllSpecProposalsQuery("");

  const selectedProposals = data?.proposals?.filter((proposal) =>
    selected.includes(proposal.id)
  );

  return (
    <div>
      {selected.length > 0 && data?.proposals && (
        <SelectedProposals
          selectedProposals={selectedProposals}
          proposals={data.proposals}
          spec={true}
        />
      )}
      <WarehouseForm selectedIds={selected} />
    </div>
  );
}
