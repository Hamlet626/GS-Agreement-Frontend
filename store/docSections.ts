import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IdocSections {
  documentTitle: string;
  documentStorageTitle: string;
  sections: ISection[];
}

export type ISection = {
  title: string;
  text: string;
};

const initialState: IdocSections = {
  documentTitle: "",
  documentStorageTitle: "",
  sections: [],
};

export const slice = createSlice({
  name: "docSections",
  initialState,
  reducers: {
    setSections: (state, action) => {
      state.sections = action.payload;
      localStorage.setItem("sections", JSON.stringify(action.payload));
    },
    setDocumentTitle: (state, action) => {
      state.documentTitle = action.payload;
      localStorage.setItem("documentTitle", JSON.stringify(action.payload));
    },
    setDocumentStorageTitle: (state, action) => {
      state.documentStorageTitle = action.payload;
      localStorage.setItem("documentStorageTitle", JSON.stringify(action.payload));
    },
    resetSection: (state) => {
      state.sections = [];
      state.documentTitle = "";
      state.documentStorageTitle = "";
    },
  },
});

export const selectSection = (state: RootState) => state.docSections.sections;
export const selectDocumentTitle = (state: RootState) =>
  state.docSections.documentTitle;
export const selectDocumentStorageTitle = (state: RootState) =>
    state.docSections.documentStorageTitle;

export const { setSections, setDocumentTitle, setDocumentStorageTitle, resetSection } = slice.actions;
export default slice.reducer;
