"use client";

import FormProposal from "@/components/railway/proposals/FormProposal";
import { useAddRailwayProposalMutation } from "@/services/railwayProposalsService";

function Page() {
  const [createProposal, { isLoading, error, isSuccess }] =
    useAddRailwayProposalMutation();

  const handleCreate = async (form) => {
    return await createProposal(form);
  };

  return (
    <>
      <FormProposal
        buttonTitle={"Создать"}
        onSubmit={handleCreate}
        isLoading={isLoading}
        error={error}
        isSuccess={isSuccess}
        successMessage={"Заявка создана"}
      />
    </>
  );
}

export default Page;
