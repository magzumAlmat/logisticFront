import { createSlice } from "@reduxjs/toolkit";
import { companiesApi } from "../services/companiesService";

const initialState = {
  companies: [],
  company: null,
};

const slice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      companiesApi.endpoints.getAllCompanies.matchFulfilled,
      (state, action) => {
        state.companies = action.payload.companies;
      }
    );

    builder.addMatcher(
      companiesApi.endpoints.getCompany.matchFulfilled,
      (state, action) => {
        state.company = action.payload.company;
      }
    );
  },
});

export const {} = slice.actions;
export default slice.reducer;

export const selectCompanies = (state) => state.companies.companies;
export const selectCompany = (state) => state.companies.company;
