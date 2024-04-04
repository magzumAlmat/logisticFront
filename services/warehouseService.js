import { api } from "./api";

export const warehouseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllWarehouses: builder.query({
      query: () => ({
        url: `/warehouses`,
        method: "GET",
      }),
    }),
    addWarehouse: builder.mutation({
      query: (data) => ({
        url: `/warehouses`,
        method: "POST",
        body: data,
      }),
    }),
    moveProposals: builder.mutation({
      query: (data) => ({
        url: `/warehouses/move`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllWarehousesQuery,
  useAddWarehouseMutation,
  useMoveProposalsMutation,
} = warehouseApi;
