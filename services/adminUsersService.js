import { api } from "./api";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/user/all",
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/user/profile/${id}`,
        method: "GET",
      }),
    }),
    editUser: builder.mutation({
      query: (data) => ({
        url: `/user/edit/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    resetUserPassword: builder.mutation({
      query: (data) => ({
        url: `/user/reset-password/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deactivateUser: builder.mutation({
      query: (data) => ({
        url: `/user/deactivate/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    activateUser: builder.mutation({
      query: (data) => ({
        url: `/user/activate/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user/create-user",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useEditUserMutation,
  useResetUserPasswordMutation,
  useDeactivateUserMutation,
  useActivateUserMutation,
  useCreateUserMutation,
} = usersApi;
