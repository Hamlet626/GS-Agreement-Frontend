import { combineReducers, configureStore } from "@reduxjs/toolkit";
import docSections from "./docSections";
import loaderStatus from "./loaderStatus";
import modal from "./modal";
import saveSection from "./saveSection";
import sbpData from "./sbpData";
import emailSender from "./emailSender";

import { setupListeners } from "@reduxjs/toolkit/query";
import thunk from "redux-thunk";

const reducer = combineReducers({
  docSections,
  loaderStatus,
  modal,
  saveSection,
  sbpData,
  emailSender
});
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
