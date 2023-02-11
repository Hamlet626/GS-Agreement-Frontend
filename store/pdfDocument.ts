import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IpdfDocument {
  document: string;
}

const initialState: IpdfDocument = {
  document: "",
};

export const slice = createSlice({
  name: "pdfDocument",
  initialState,
  reducers: {
    setPdfDocument: (state, action) => {
      state.document = action.payload;
    },
    removePdfDocument: (state) => {
      state.document = "";
    },
  },
});

export const selectPdfDocumennt = (state: RootState) => state.pdfDocument;

export const { setPdfDocument, removePdfDocument } = slice.actions;
export default slice.reducer;
