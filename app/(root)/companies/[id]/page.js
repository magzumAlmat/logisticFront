"use client";

import Heading from "@/shared/heading/heading";
import FormCompany from "@/components/companies/formCompany/formCompany";
import {
  useEditCompanyMutation,
  useGetCompanyQuery,
} from "@/services/companiesService";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCompany } from "@/slice/companySlice";

function NewCompanyPage({ params }) {
  const { data } = useGetCompanyQuery(params.id);

  const company = useSelector(selectCompany);

  const [editCompany, { isLoading, error, isSuccess }] =
    useEditCompanyMutation();

  const handleSubmit = async (data) => {
    return await editCompany(data);
  };

  return (
    <div>
      <Heading text="Редактировать компанию" level={2} className={"mb-3"} />
      {data && (
        <FormCompany
          company={company}
          buttonTitle={"Сохранить"}
          successMessage={"Компания обновлена"}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          isSuccess={isSuccess}
        />
      )}
    </div>
  );
}

export default NewCompanyPage;
