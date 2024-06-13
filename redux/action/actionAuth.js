import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAdminType, fetchAdminType, loginAdminType } from "./actionTypes";
import * as SecureStore from "expo-secure-store";
import { USER_DATA, USER_TOKEN } from "../../constant/KeyStore";

export const createAdmin = createAsyncThunk(createAdminType, async (data) => {
  const jsonData = JSON.stringify(data);
  await SecureStore.setItemAsync(USER_DATA, jsonData);

  const result = await SecureStore.getItemAsync(USER_DATA);

  return JSON.parse(result);
});

export const fetchAdmin = createAsyncThunk(fetchAdminType, async () => {
  const data = await SecureStore.getItemAsync(USER_DATA);

  return JSON.parse(data);
});

export const loginAdmin = createAsyncThunk(loginAdminType, async (data) => {
  const jsonData = JSON.stringify(data);

  await SecureStore.setItemAsync(USER_TOKEN, jsonData);

  const result = await SecureStore.getItemAsync(USER_TOKEN);

  return result;
});

export const logoutAdmin = createAsyncThunk(logoutAdmin, async () => {
  await SecureStore.deleteItemAsync(USER_TOKEN);
});
