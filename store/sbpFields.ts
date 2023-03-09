import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IsbpFields {
  fields: IField[];
}


export type IField = {
  label: string,
  value: Date,
  id: string
};

const initialState: IsbpFields = {
  fields: [],
};

export const slice = createSlice({
  name: "sbpFields",
  initialState,
  reducers: {
    setSbpFields: (state, action) => {
      state.fields = action.payload;
    },
    resetSbpFields: (state) => {
      state.fields = [];
    },
  },
});

export const selectSbpFields = (state: RootState) => state.sbpFields.fields;

export const { setSbpFields, resetSbpFields } = slice.actions;
export default slice.reducer;
