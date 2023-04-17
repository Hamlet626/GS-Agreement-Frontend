import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IEmailSender {
  emailDrawerOpen: boolean;
  emailContent: string
}

const initialState: IEmailSender = {
  emailDrawerOpen: false,
  emailContent: '',
};

export const slice = createSlice({
  name: "emailSender",
  initialState,
  reducers: {
    openEmailDrawer: (state, { payload: { emailContent } }) => {
      state.emailDrawerOpen = true;
      state.emailContent = emailContent
    },
    closeEmailDrawer: (state) => {
      state.emailDrawerOpen = false;
    },
  },
});

export const selectEmailDrawerStatus = (state: RootState) =>
  state.emailSender.emailDrawerOpen;
  
export const selectEmailContent = (state: RootState) =>
  state.emailSender.emailContent;

export const { openEmailDrawer, closeEmailDrawer } = slice.actions;
export default slice.reducer;
