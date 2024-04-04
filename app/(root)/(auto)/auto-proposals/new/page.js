"use client";
import FormProposal from "@/components/proposals/formProposal/formProposal";
import { useAddProposalMutation } from "@/services/proposalsService";
import Heading from "@/shared/heading/heading";
import { selectUser } from "@/slice/authSlice";
import { useSelector } from "react-redux";

function NewProposalPage() {
  const [createProposal, { isLoading, error, isSuccess }] =
    useAddProposalMutation();

  const handleCreate = async (form) => {
    return await createProposal(form);
  };

  return (
    <div>
      <Heading text="Новая заявка" level={2} className="mb-3" />
      <FormProposal
        isReset={false}
        onSubmit={handleCreate}
        buttonTitle={"Создать"}
        isLoading={isLoading}
        error={error}
        isSuccess={isSuccess}
        successMessage={"Заявка создана"}
        newProposal={true}
      />
    </div>
  );
}

export default NewProposalPage;
