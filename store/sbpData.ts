import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IsbpData {
  fields?: IField;
  sbpFileName: string;
  sbpChat: any[];
  sbpPaymentTabs: IPayments
}

export type IField = {
  date: string[]
  boolean: string[]
};

export type IPayments = {
  certain_payments?: any[]
  uncertain_payments?: any[]
};


const initialState: IsbpData = {
  fields: undefined,
  sbpFileName: "",
  sbpChat: [],
  sbpPaymentTabs: {}
};

export const slice = createSlice({
  name: "sbpData",
  initialState,
  reducers: {
    setSbpFileData: (state, { payload: { fields, sbpFileName } }) => {
      state.fields = fields;
      state.sbpFileName = sbpFileName;
    },
    pushSbpChatChoice: (state, { payload: { chat } }) => {
      state.sbpChat = [...state.sbpChat, ...chat]
    },
    setSbpPaymentTabs: (state, { payload: { sbpPaymentTabs } }) => {
      state.sbpPaymentTabs = JSON.parse(sbpPaymentTabs)
    },
    resetSbpData: (state) => {
      state.fields = initialState.fields;
      state.sbpFileName = initialState.sbpFileName;
      state.sbpChat = initialState.sbpChat;
    },
  },
});

export const selectSbpData = (state: RootState) => state.sbpData;

export const { setSbpFileData, pushSbpChatChoice, setSbpPaymentTabs, resetSbpData } = slice.actions;
export default slice.reducer;
