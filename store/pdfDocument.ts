import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IpdfDocument {
  sections: ISection[];
}

type ISection = {
  title: string;
  text: string;
};

const initialState: IpdfDocument = {
  sections: [],
};

export const slice = createSlice({
  name: "pdfDocument",
  initialState,
  reducers: {
    setSections: (state, action) => {
      state.sections = action.payload;
    },
    resetSection: (state) => {
      state = initialState;
    },
  },
});

export const selectSection = (state: RootState) => state.pdfDocument.sections;

export const { setSections, resetSection } = slice.actions;
export default slice.reducer;
