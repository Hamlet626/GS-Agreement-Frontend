import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IsbpData {
  fields?: IField;
  sbpFileName: string;
  sbpPaymentTabs: IPayments;
  embeddings?: { [content: string]: { embedding: number[]; tokenNum: number } };
  fileText?: string;
  dateMergeList?:{[date:string]:string[]};
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
  fileText: undefined,
  dateMergeList:undefined,
};

export const slice = createSlice({
  name: "sbpData",
  initialState,
  reducers: {
    setSbpFileData: (state, { payload: { fields, sbpFileName, fileText ,embeddings} }) => {
      state.fields = fields;
      state.sbpFileName = sbpFileName;
      state.fileText = fileText;
      state.embeddings = embeddings;
    },
    setSbpDateMergeList: (state, { payload: { dateMergeList } }) => {
      state.dateMergeList = dateMergeList;
    },
    setSbpPaymentTabs: (state, { payload: { sbpPaymentTabs } }) => {
      state.sbpPaymentTabs = sbpPaymentTabs;
    },
    resetSbpData: (state) => {
      state.fields = initialState.fields;
      state.sbpFileName = initialState.sbpFileName;
      state.sbpPaymentTabs = initialState.sbpPaymentTabs;
      state.embeddings = initialState.embeddings;
      state.fileText = initialState.fileText;
    },
  },
});

export const selectSbpData = (state: RootState) => state.sbpData;

export const {
  setSbpFileData,
  setSbpPaymentTabs,
  setSbpDateMergeList,
  resetSbpData,
} = slice.actions;
export default slice.reducer;
