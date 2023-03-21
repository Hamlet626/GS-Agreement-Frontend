import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IsbpData {
  fields?: IField;
  sbpFileName: string;
  sbpPaymentTabs: IPayments;
  embeddings: { [content: string]: { embedding: number[]; tokenNum: number } };
}

export type IField = {
  date: string[];
  boolean: string[];
};

export type IPayments = {
  certain_payments?: any;
  uncertain_payments?: any;
};

const initialState: IsbpData = {
  fields: undefined,
  sbpFileName: "",
  sbpPaymentTabs: {},
  embeddings: {},
};

export const slice = createSlice({
  name: "sbpData",
  initialState,
  reducers: {
    setSbpFileData: (state, { payload: { fields, sbpFileName } }) => {
      state.fields = fields;
      state.sbpFileName = sbpFileName;
    },
    setSbpEmbeddings: (state, { payload: { embeddings } }) => {
      state.embeddings = embeddings;
    },
    setSbpPaymentTabs: (state, { payload: { sbpPaymentTabs } }) => {
      state.sbpPaymentTabs = JSON.parse(sbpPaymentTabs);
    },
    resetSbpData: (state) => {
      state.fields = initialState.fields;
      state.sbpFileName = initialState.sbpFileName;
      state.sbpPaymentTabs = initialState.sbpPaymentTabs;
      state.embeddings = initialState.embeddings;
    },
  },
});

export const selectSbpData = (state: RootState) => state.sbpData;

export const {
  setSbpFileData,
  setSbpPaymentTabs,
  setSbpEmbeddings,
  resetSbpData,
} = slice.actions;
export default slice.reducer;
