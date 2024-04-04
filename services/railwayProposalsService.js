import { api } from "./api";

export const proposalsRailwayApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllRailwayProposals: builder.query({
      query: (search) => ({
        url: `/railway/proposals?search=${search}`,
        method: "GET",
      }),
    }),
    getAllArchivedRailwayProposals: builder.query({
      query: (search) => ({
        url: `/railway/proposals/archived?search=${search}`,
        method: "GET",
      }),
    }),
    addRailwayProposal: builder.mutation({
      query: (data) => ({
        url: "/railway/proposals",
        method: "POST",
        body: data,
      }),
    }),
    deleteRailwayProposal: builder.mutation({
      query: (id) => ({
        url: `/railway/proposals/${id}`,
        method: "DELETE",
      }),
    }),
    editRailwayProposal: builder.mutation({
      query: (data) => ({
        url: `/railway/proposals/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getRailwayProposal: builder.query({
      query: (id) => ({
        url: `/railway/proposals/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllRailwayProposalsQuery,
  useGetAllArchivedRailwayProposalsQuery,
  useAddRailwayProposalMutation,
  useDeleteRailwayProposalMutation,
  useEditRailwayProposalMutation,
  useGetRailwayProposalQuery,
} = proposalsRailwayApi;
