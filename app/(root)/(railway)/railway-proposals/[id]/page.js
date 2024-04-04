"use client";

import FormProposal from "@/components/railway/proposals/FormProposal";
import {
  useEditRailwayProposalMutation,
  useGetRailwayProposalQuery,
} from "@/services/railwayProposalsService";
import { useEffect } from "react";

function Page({ params }) {
  const [editProposal, { isLoading, error, isSuccess }] =
    useEditRailwayProposalMutation();

  const { data, refetch } = useGetRailwayProposalQuery(params.id);

  const handleEdit = async (form) => {
    return await editProposal(form);
  };

  useEffect(() => {
    refetch();
  }, [params.id, refetch]);

  return (
    <>
      {data && data.proposal && (
        <FormProposal
          proposal={data.proposal}
          onSubmit={handleEdit}
          buttonTitle={"Сохранить"}
          isLoading={isLoading}
          error={error}
          isSuccess={isSuccess}
          successMessage={"Заявка отредактирована"}
        />
      )}
    </>
  );
}

export default Page;
