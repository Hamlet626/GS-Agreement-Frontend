import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface ILoaderStatus {
  status: boolean;
  title: string;
  message: string;
}

const initialState: ILoaderStatus = {
  status: false,
  title: "",
  message: "",
};

export const slice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    mountModal: (state, { payload: { status, title, message } }) => {
      state.status = status;
      state.title = title;
      state.message = message;
    },
    destroyModal: (state) => {
      state.status = initialState.status;
      state.title = initialState.title;
      state.message = initialState.message;
    },
  },
});

export const selectModal = (state: RootState) => state.modal;

export const { mountModal, destroyModal } = slice.actions;
export default slice.reducer;
