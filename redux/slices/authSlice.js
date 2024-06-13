import { createSlice } from "@reduxjs/toolkit";
import {
  createAdmin,
  fetchAdmin,
  loginAdmin,
  logoutAdmin,
} from "../action/actionAuth";

const initialState = {
  isLoading: false,
  error: null,
  adminData: {},
  token: {},
  isLoggingIn: false,
  isLoggingOut: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminData = action.payload;
    });
    builder.addCase(createAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminData = action.payload;
    });
    builder.addCase(fetchAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(loginAdmin.pending, (state) => {
      state.isLoading = true;
      state.isLoggingIn = false;
    });
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.token = action.payload;
      state.isLoggingIn = true;
      state.isLoggingOut = false;
    });
    builder.addCase(loginAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.isLoggingIn = true;
    });
    builder.addCase(logoutAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutAdmin.fulfilled, (state) => {
      state.isLoading = false;
      state.isLoggingOut = true;
      state.isLoggingIn = false;
    });
    builder.addCase(logoutAdmin.rejected, (state) => {
      state.isLoading = false;
      state.isLoggingOut = false;
      state.error = false;
    });
  },
});

export default authSlice.reducer;
