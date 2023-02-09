import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface ILoaderStatus {
  loading: boolean;
}

const initialState: ILoaderStatus = {
  loading: false,
};

export const slice = createSlice({
  name: "loaderStatus",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    unsetLoading: (state) => {
      state.loading = false;
    },
  },
});

export const selectLoaderStatus = (state: RootState) =>
  state.loaderStatus.loading;

export const { setLoading, unsetLoading } = slice.actions;
export default slice.reducer;
