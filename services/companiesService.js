import { api } from "./api";

export const companiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation({
      query: (data) => ({
        url: "/companies",
        method: "POST",
        body: data,
      }),
    }),
    getAllCompanies: builder.query({
      query: (search) => {
        const url = `/companies?search=${search}`;
        return {
          url,
          method: "GET",
        };
      },
    }),
    editCompany: builder.mutation({
      query: (data) => ({
        url: `/companies/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getCompany: builder.query({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "GET",
      }),
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
    }),
    getCompanyLabels: builder.query({
      query: () => ({
        url: "/companies/labels",
        method: "GET",
      }),
    }),
    deleteCompanyCar: builder.mutation({
      query: (data) => ({
        url: `/companies/company-car/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetAllCompaniesQuery,
  useEditCompanyMutation,
  useGetCompanyQuery,
  useDeleteCompanyMutation,
  useGetCompanyLabelsQuery,
  useDeleteCompanyCarMutation,
} = companiesApi;
