import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "./userSlice"

const appStore = configureStore({
  reducer: {useReducer},
});

export default appStore;
