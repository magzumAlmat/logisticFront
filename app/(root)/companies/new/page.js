"use client";

import Heading from "@/shared/heading/heading";
import FormCompany from "@/components/companies/formCompany/formCompany";
import {
  useAddCarsMutation,
  useCreateCompanyMutation,
  useGetAllCompaniesQuery,
} from "@/services/companiesService";
import { Alert } from "@mui/material";

function NewCompanyPage() {
  const [createCompany, { isLoading, error, isSuccess }] =
    useCreateCompanyMutation();

  const handleSubmit = async (data) => {
    return await createCompany(data);
  };

  return (
    <div>
      <Heading text="Новая компания" level={2} className={"mb-3"} />
      <FormCompany
        buttonTitle={"Добавить компанию"}
        successMessage={"Компания добавлена"}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        isSuccess={isSuccess}
      />
    </div>
  );
}

export default NewCompanyPage;
