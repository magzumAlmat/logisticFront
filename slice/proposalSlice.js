import { createSlice } from "@reduxjs/toolkit";
import { proposalsApi } from "../services/proposalsService";

const initialState = {
  proposals: [],
  proposal: {},
};

const slice = createSlice({
  name: "proposal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      proposalsApi.endpoints.getAllProposals.matchFulfilled,
      (state, action) => {
        state.proposals = action.payload.proposals;
      }
    );

    builder.addMatcher(
      proposalsApi.endpoints.getProposal.matchFulfilled,
      (state, action) => {
        state.proposal = action.payload.proposal;
      }
    );
  },
});

export const {} = slice.actions;
export default slice.reducer;

export const selectProposals = (state) => state.proposals.proposals;
export const selectProposal = (state) => state.proposals.proposal;
