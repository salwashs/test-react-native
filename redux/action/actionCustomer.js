import { createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import {
  createCustomerType,
  deleteCustomerType,
  fetchDistrictType,
  fetchProvinceType,
  fetchRegencyType,
} from "./actionTypes";
import { CUSTOMER_DATA } from "../../constant/KeyStore";
import { formattedDate } from "../../helper/helper";

export const fetchProvince = createAsyncThunk(fetchProvinceType, async () => {
  const getProvince = await fetch(
    "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await getProvince.json();

  return data;
});

export const fetchRegency = createAsyncThunk(
  fetchRegencyType,
  async (provinceId) => {
    const getRegency = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await getRegency.json();

    return data;
  }
);

export const fetchDistrict = createAsyncThunk(
  fetchDistrictType,
  async (regencyId) => {
    const getDistrict = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await getDistrict.json();

    return data;
  }
);

export const createCustomer = createAsyncThunk(
  createCustomerType,
  async (data) => {
    const { name, province, regency, district } = data;

    const splittedProvince = province.split("|");
    const splittedRegency = regency.split("|");
    const splittedDistrict = district.split("|");

    const newData = {
      id: Math.floor(Math.random() * 10000),
      name: name,
      province: splittedProvince[1],
      provinceId: splittedProvince[0],
      regency: splittedRegency[1],
      regencyId: splittedRegency[0],
      district: splittedDistrict[1],
      districtId: splittedDistrict[0],
      date: formattedDate(),
    };

    const dataStore = await SecureStore.getItemAsync(CUSTOMER_DATA);
    if (dataStore) {
      const dataCust = JSON.parse(dataStore);
      if (Array.isArray(dataCust) && dataCust.length > 0) {
        dataCust.unshift(newData);
        const stringyData = JSON.stringify(dataCust);
        await SecureStore.setItemAsync(CUSTOMER_DATA, stringyData);
        return;
      }

      await SecureStore.deleteItemAsync(CUSTOMER_DATA);
      const newField = [];
      newField.push(newData);
      const strData = JSON.stringify(newField);

      await SecureStore.setItemAsync(CUSTOMER_DATA, strData);
    }

    const newField = [];
    newField.push(newData);
    const strData = JSON.stringify(newField);

    await SecureStore.setItemAsync(CUSTOMER_DATA, strData);

    return newData;
  }
);
