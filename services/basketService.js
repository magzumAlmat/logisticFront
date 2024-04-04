import { api } from "./api";

export const basketApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyCarLabels: builder.query({
      query: () => ({
        url: "/basket/labels",
        method: "GET",
      }),
    }),
    createBasket: builder.mutation({
      query: (body) => ({
        url: "/basket",
        method: "POST",
        body,
      }),
    }),
    getAllBaskets: builder.query({
      query: (search) => ({
        url: `/basket?search=${search}`,
        method: "GET",
      }),
    }),
    getBasket: builder.query({
      query: (id) => ({
        url: `/basket/${id}`,
        method: "GET",
      }),
    }),
    deleteBasket: builder.mutation({
      query: (id) => ({
        url: `/basket/${id}`,
        method: "DELETE",
      }),
    }),
    editBasket: builder.mutation({
      query: (body) => ({
        url: `/basket/${body.id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteBasketCar: builder.mutation({
      query: (id) => ({
        url: `/basket/car/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCompanyCarLabelsQuery,
  useCreateBasketMutation,
  useGetAllBasketsQuery,
  useDeleteBasketMutation,
  useGetBasketQuery,
  useDeleteBasketCarMutation,
  useEditBasketMutation,
} = basketApi;
