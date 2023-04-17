import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IChatOpen {
  open: boolean;
}

const initialState: IChatOpen = {
  open: false,
};

export const slice = createSlice({
  name: "chatOpen",
  initialState,
  reducers: {
    openChat: (state) => {
      state.open = true;
    },
    closeChat: (state) => {
      state.open = false;
    },
  },
});

export const selectChatStatus = (state: RootState) => state.chatOpen.open;

export const { openChat, closeChat } = slice.actions;
export default slice.reducer;
