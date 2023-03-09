import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IsbpData {
  fields: IField[];
  sbpFileName: string;
}

export type IField = {
  label: string;
  name: string;
  value?: Date;
  id: string;
};

const initialState: IsbpData = {
  fields: [],
  sbpFileName: "",
};

export const slice = createSlice({
  name: "sbpData",
  initialState,
  reducers: {
    setSbpData: (state, { payload: { fields, sbpFileName}}) => {
      state.fields = fields;
      state.sbpFileName = sbpFileName;
    },
    resetSbpData: (state) => {
      state.fields = [];
      state.sbpFileName = "";
    },
  },
});

export const selectSbpData = (state: RootState) => state.sbpData;

export const { setSbpData, resetSbpData } = slice.actions;
export default slice.reducer;
