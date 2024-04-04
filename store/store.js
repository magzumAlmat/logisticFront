import { configureStore } from "@reduxjs/toolkit";
import auth from "../slice/authSlice";
import { api } from "../services/api";
import users from "../slice/adminUsersSlice";
import companies from "../slice/companySlice";
import proposals from "../slice/proposalSlice";
import module from "../slice/moduleSlice";
import selected from "../slice/selectedSlice";
import { listenerMiddleware } from "../middleware/auth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    users,
    companies,
    proposals,
    module,
    selected,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});
