import { api } from "./api";

export const basketApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSpecCompanyCarLabels: builder.query({
      query: () => ({
        url: "/basket/labels",
        method: "GET",
      }),
    }),
    createSpecBasket: builder.mutation({
      query: (body) => ({
        url: "/spec/basket",
        method: "POST",
        body,
      }),
    }),
    getAllSpecBaskets: builder.query({
      query: (search) => ({
        url: `/spec/basket?search=${search}`,
        method: "GET",
      }),
    }),
    getSpecBasket: builder.query({
      query: (id) => ({
        url: `/spec/basket/${id}`,
        method: "GET",
      }),
    }),
    deleteSpecBasket: builder.mutation({
      query: (id) => ({
        url: `/spec/basket/${id}`,
        method: "DELETE",
      }),
    }),
    editSpecBasket: builder.mutation({
      query: (body) => ({
        url: `/spec/basket/${body.id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteSpecBasketCar: builder.mutation({
      query: (id) => ({
        url: `/spec/basket/car/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSpecCompanyCarLabelsQuery,
  useCreateSpecBasketMutation,
  useGetAllSpecBasketsQuery,
  useDeleteSpecBasketMutation,
  useGetSpecBasketQuery,
  useDeleteSpecBasketCarMutation,
  useEditSpecBasketMutation,
} = basketApi;
