import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IpdfDocument {
  sections: ISection[];
}

type ISection = {
  title: string;
  text: string;
  transcriptions: ITranscription[];
};

type ITranscription = {
  yPosition: string;
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
    setTranscription: (state, action) => {
      state.sections[action.payload.position].transcriptions = [
        ...state.sections[action.payload.position].transcriptions,
        action.payload.transcription,
      ];
    },
    resetSection: (state) => {
      state = initialState;
    },
  },
});

export const selectSection = (state: RootState) => state.pdfDocument.sections;

export const { setSections, setTranscription, resetSection } = slice.actions;
export default slice.reducer;
