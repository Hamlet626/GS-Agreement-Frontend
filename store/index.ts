import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pdfDocument from "./pdfDocument";
import loaderStatus from "./loaderStatus";
import modal from "./modal";
import saveSection from "./saveSection";

import { setupListeners } from "@reduxjs/toolkit/query";
import thunk from "redux-thunk";

const reducer = combineReducers({
  pdfDocument,
  loaderStatus,
  modal,
  saveSection
});
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
