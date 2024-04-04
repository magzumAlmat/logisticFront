import { api } from "./api";

export const proposalsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProposals: builder.query({
      query: (search) => ({
        url: `/proposals?search=${search}`,
        method: "GET",
      }),
    }),
    addProposal: builder.mutation({
      query: (data) => ({
        url: "/proposals",
        method: "POST",
        body: data,
      }),
    }),
    deleteProposal: builder.mutation({
      query: (id) => ({
        url: `/proposals/${id}`,
        method: "DELETE",
      }),
    }),
    editProposal: builder.mutation({
      query: (data) => ({
        url: `/proposals/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getProposal: builder.query({
      query: (id) => ({
        url: `/proposals/${id}`,
        method: "GET",
      }),
    }),
    deleteExpense: builder.mutation({
      query: (data) => ({
        url: `/proposals/local-expense/${data.id}`,
        method: "DELETE",
      }),
    }),
    getArchivedProposals: builder.query({
      query: (search) => ({
        url: "/proposals/archived?search=" + search,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllProposalsQuery,
  useAddProposalMutation,
  useDeleteProposalMutation,
  useEditProposalMutation,
  useGetProposalQuery,
  useDeleteExpenseMutation,
  useGetArchivedProposalsQuery,
} = proposalsApi;
