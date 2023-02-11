import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IpdfDocument {
  document: string;
  titles: string[];
}

const initialState: IpdfDocument = {
  document: "",
  titles: [],
};

export const slice = createSlice({
  name: "pdfDocument",
  initialState,
  reducers: {
    setPdfDocument: (state, action) => {
      state.document = action.payload;
    },
    setPdfDocumentTitles: (state, action) => {
      state.titles = action.payload;
    },
    resetPdfDocument: (state) => {
      state = initialState;
    },
  },
});

export const selectPdfDocumennt = (state: RootState) =>
  state.pdfDocument.document;
export const selectPdfTitles = (state: RootState) => state.pdfDocument.titles;

export const { setPdfDocument, resetPdfDocument, setPdfDocumentTitles } =
  slice.actions;
export default slice.reducer;
