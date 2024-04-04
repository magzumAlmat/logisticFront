"use client";
import FormProposal from "@/components/spec/proposals/formProposal/formProposal";
import {
  useEditSpecProposalMutation,
  useGetSpecProposalQuery,
} from "@/services/specProposalsService";
import Heading from "@/shared/heading/heading";
import { selectProposal } from "@/slice/proposalSlice";
import { Alert } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FormSkeleton from "@/shared/formSkeleton/formSkeleton";

function EditProposalPage({ params }) {
  const [editProposal, { isLoading, error, isSuccess }] =
    useEditSpecProposalMutation();

  const { data, refetch } = useGetSpecProposalQuery(params.id);

  const handleEdit = async (form) => {
    return await editProposal(form);
  };

  useEffect(() => {
    refetch();
  }, [params.id, refetch]);

  return (
    <div>
      <Heading text="Редактировать заявку" level={2} className="mb-3" />
      {data && data.proposal ? (
        <FormProposal
          proposal={data.proposal}
          isReset={false}
          onSubmit={handleEdit}
          buttonTitle={"Сохранить"}
          isLoading={isLoading}
          error={error}
          isSuccess={isSuccess}
          successMessage={"Заявка отредактирована"}
        />
      ) : (
        <FormSkeleton />
      )}
    </div>
  );
}

export default EditProposalPage;
