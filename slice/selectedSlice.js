import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: [],
  selectedToExport: [],
  pathname: "",
};

const slice = createSlice({
  name: "select",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setSelectedToExport: (state, action) => {
      state.selectedToExport = action.payload;
    },
    setPathname: (state, action) => {
      state.pathname = action.payload;
    },
  },
});

export const { setSelected, setSelectedToExport, setPathname } = slice.actions;
export default slice.reducer;

export const selectSelected = (state) => state.selected.selected;
export const selectSelectedToExport = (state) =>
  state.selected.selectedToExport;
export const selectPathname = (state) => state.selected.pathname;
