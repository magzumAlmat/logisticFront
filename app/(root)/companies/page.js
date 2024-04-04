import React from "react";
import dynamic from "next/dynamic";
import { LinearProgress } from "@mui/material";

export const metadata = {
  title: "Компании | CRM Pandora Logistics",
};

const DynamicCompaniesTable = dynamic(
  () => import("@/components/companies/companiesTable/companiesTable"),
  {
    loading: () => <LinearProgress />,
  }
);

export default function CompaniesPage() {
  return <DynamicCompaniesTable />;
}
