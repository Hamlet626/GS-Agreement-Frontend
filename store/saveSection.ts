import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface ISaveSection {
  callbackArray: { callback: Function; id: string }[];
}

const initialState: ISaveSection = {
  callbackArray: [],
};

export const slice = createSlice({
  name: "saveSection",
  initialState,
  reducers: {
    pushCallback: (state, { payload: { callback, id } }) => {
      state.callbackArray = [...state?.callbackArray, { callback, id }];
    },
    removeCallbackById: (state, { payload: { id: removeId } }) => {
      state.callbackArray = state.callbackArray.filter(({ id }) => id !== removeId)
    },
    removeAllCallback: (state) => {
      state.callbackArray = [];
    },
  },
});

export const selectCallbackArray = (state: RootState) =>
  state.saveSection.callbackArray;

export const { pushCallback, removeCallbackById, removeAllCallback } =
  slice.actions;
export default slice.reducer;
