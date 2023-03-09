import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pdfDocument from "./pdfDocument";
import loaderStatus from "./loaderStatus";
import modal from "./modal";
import saveSection from "./saveSection";
import sbpData from "./sbpData";

import { setupListeners } from "@reduxjs/toolkit/query";
import thunk from "redux-thunk";

const reducer = combineReducers({
  pdfDocument,
  loaderStatus,
  modal,
  saveSection,
  sbpData
});
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
