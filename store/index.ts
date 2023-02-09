import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pdfDocument from "./pdfDocument";

import { setupListeners } from "@reduxjs/toolkit/query";
import thunk from "redux-thunk";

const reducer = combineReducers({
  pdfDocument,
});
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
