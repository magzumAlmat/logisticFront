import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/authService";

const initialState = {
  user: null,
  isAuth: false,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.current.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
      }
    );
  },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuth = (state) => state.auth.isAuth;
export const selectUser = (state) => state.auth.user;
