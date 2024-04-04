import { api } from "./api";

export const proposalsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSpecProposals: builder.query({
      query: (search) => ({
        url: `/spec/proposals?search=${search}`,
        method: "GET",
      }),
    }),
    addSpecProposal: builder.mutation({
      query: (data) => ({
        url: "/spec/proposals",
        method: "POST",
        body: data,
      }),
    }),
    deleteSpecProposal: builder.mutation({
      query: (id) => ({
        url: `/spec/proposals/${id}`,
        method: "DELETE",
      }),
    }),
    editSpecProposal: builder.mutation({
      query: (data) => ({
        url: `/spec/proposals/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getSpecProposal: builder.query({
      query: (id) => ({
        url: `/spec/proposals/${id}`,
        method: "GET",
      }),
    }),
    deleteSpecExpense: builder.mutation({
      query: (data) => ({
        url: `/spec/proposals/local-expense/${data.id}`,
        method: "DELETE",
      }),
    }),
    getArchivedSpecProposals: builder.query({
      query: (search) => ({
        url: "/spec/proposals/archived?search=" + search,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllSpecProposalsQuery,
  useAddSpecProposalMutation,
  useDeleteSpecExpenseMutation,
  useEditSpecProposalMutation,
  useGetSpecProposalQuery,
  useGetArchivedSpecProposalsQuery,
  useDeleteSpecProposalMutation,
} = proposalsApi;
