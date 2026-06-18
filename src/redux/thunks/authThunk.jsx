import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminSigninAPI, adminInfoAPI } from "../api/authApi";

export const adminSignin = createAsyncThunk(
  "auth/adminSignin",
  async (data, thunkAPI) => {
    try {
      const res = await adminSigninAPI(data);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const getAdminInfo = createAsyncThunk(
  "auth/getAdminInfo",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);
      const res = await adminInfoAPI(token);
      console.log("PROFILE DATA", res.data);
      return res.data;
    } catch (err) {
      console.log(err.response?.data);
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);