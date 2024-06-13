import { createSlice } from "@reduxjs/toolkit";
import {
  createCustomer,
  deleteCustomer,
  fetchDistrict,
  fetchProvince,
  fetchRegency,
} from "../action/actionCustomer";

const initialState = {
  data: [
    {
      id: 1,
      name: "Salwa",
      province: "SULAWESI SELATAN",
      provinceId: 73,
      regency: "KABUPATEN GOWA",
      regencyId: 7306,
      district: "PALLANGGA",
      districtId: 7306030,
      date: "13 Juni 2024",
    },
  ],
  customers: [],
  customer: {},
  province: [],
  regency: [],
  district: [],
  isLoading: false,
  isDeleted: false,
  error: null,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    clearCacheRegency: (state) => {
      state.regency = [];
    },
    clearCacheDistrict: (state) => {
      state.district = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProvince.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProvince.fulfilled, (state, action) => {
      state.isLoading = false;
      state.province = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProvince.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchRegency.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchRegency.fulfilled, (state, action) => {
      state.isLoading = false;
      state.regency = action.payload;
      state.error = null;
    });
    builder.addCase(fetchRegency.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchDistrict.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchDistrict.fulfilled, (state, action) => {
      state.isLoading = false;
      state.district = action.payload;
    });
    builder.addCase(fetchDistrict.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(createCustomer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createCustomer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearCacheRegency, clearCacheDistrict } = customerSlice.actions;

export default customerSlice.reducer;
