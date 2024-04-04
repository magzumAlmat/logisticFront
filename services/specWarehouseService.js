import { api } from "./api";

export const warehouseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSpecWarehouses: builder.query({
      query: () => ({
        url: `/spec/warehouses`,
        method: "GET",
      }),
    }),
    addSpecWarehouse: builder.mutation({
      query: (data) => ({
        url: `/spec/warehouses`,
        method: "POST",
        body: data,
      }),
    }),
    moveSpecProposals: builder.mutation({
      query: (data) => ({
        url: `/spec/warehouses/move`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSpecWarehousesQuery,
  useAddSpecWarehouseMutation,
  useMoveSpecProposalsMutation,
} = warehouseApi;
