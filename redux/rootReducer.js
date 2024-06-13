import { combineSlices } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import customerSlice from "./slices/customerSlice";

export const rootReducer = combineSlices({
  auth: authSlice,
  customer: customerSlice,
});
