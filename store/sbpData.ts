import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IsbpData {
  fields: IField[];
  sbpFileName: string;
  sbpChat: any[];
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
  sbpChat: [],
};

export const slice = createSlice({
  name: "sbpData",
  initialState,
  reducers: {
    setSbpFileData: (state, { payload: { fields, sbpFileName } }) => {
      state.fields = fields;
      state.sbpFileName = sbpFileName;
    },
    pushSbpChatChoice: (state, { payload: { choices } }) => {
      state.sbpChat = [...state.sbpChat, ...choices]
    },
    resetSbpData: (state) => {
      state.fields = initialState.fields;
      state.sbpFileName = initialState.sbpFileName;
      state.sbpChat = initialState.sbpChat;
    },
  },
});

export const selectSbpData = (state: RootState) => state.sbpData;

export const { setSbpFileData, pushSbpChatChoice, resetSbpData } = slice.actions;
export default slice.reducer;
