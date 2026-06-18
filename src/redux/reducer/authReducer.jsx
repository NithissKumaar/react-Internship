import { createSlice } from "@reduxjs/toolkit";
import { adminSignin, getAdminInfo } from "../thunks/authThunk";

const savedAuth = JSON.parse(localStorage.getItem("auth")) || {};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedAuth.user || null,
    token: savedAuth.token || localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminSignin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminSignin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(adminSignin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAdminInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;