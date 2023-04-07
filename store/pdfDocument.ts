import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IpdfDocument {
  documentTitle: string;
  sections: ISection[];
}

export type ISection = {
  title: string;
  text: string;
};

const initialState: IpdfDocument = {
  documentTitle: "",
  sections: [],
};

export const slice = createSlice({
  name: "pdfDocument",
  initialState,
  reducers: {
    setSections: (state, action) => {
      state.sections = action.payload;
      localStorage.setItem("pdfSections", JSON.stringify(action.payload));
    },
    setDocumentTitle: (state, action) => {
      state.documentTitle = action.payload;
      localStorage.setItem("documentTitle", JSON.stringify(action.payload));
    },
    resetSection: (state) => {
      state.sections = [];
      state.documentTitle = "";
    },
  },
});

export const selectSection = (state: RootState) => state.pdfDocument.sections;
export const selectDocumentTitle = (state: RootState) =>
  state.pdfDocument.documentTitle;

export const { setSections, setDocumentTitle, resetSection } = slice.actions;
export default slice.reducer;
