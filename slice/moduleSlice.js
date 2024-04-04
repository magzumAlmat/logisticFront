import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myModule: "auto",
};

const slice = createSlice({
  name: "module",
  initialState,
  reducers: {
    setMyModule: (state, action) => {
      if (action.payload) {
        state.myModule = action.payload;
      }
    },
  },
});

export const { setMyModule } = slice.actions;
export default slice.reducer;

export const selectMyModule = (state) => state.module.myModule;
