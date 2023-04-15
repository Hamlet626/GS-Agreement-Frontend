import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IdocSections {
  documentTitle: string;
  sections: ISection[];
}

export type ISection = {
  title: string;
  text: string;
};

const initialState: IdocSections = {
  documentTitle: "",
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
    resetSection: (state) => {
      state.sections = [];
      state.documentTitle = "";
    },
  },
});

export const selectSection = (state: RootState) => state.docSections.sections;
export const selectDocumentTitle = (state: RootState) =>
  state.docSections.documentTitle;

export const { setSections, setDocumentTitle, resetSection } = slice.actions;
export default slice.reducer;
