import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../services/adminUsersService";

const initialState = {
  users: [],
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.getUsers.matchFulfilled,
      (state, action) => {
        state.users = action.payload.users;
      }
    );
  },
});

export const {} = slice.actions;
export default slice.reducer;

export const selectUsers = (state) => state.users.users;
