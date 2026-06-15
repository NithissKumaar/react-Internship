import { createSlice } from "@reduxjs/toolkit";
const STORAGE_KEY = "invoices";
const loadInvoices = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};
const initialState = {
  invoices: loadInvoices(),
  loading: false,
  error: null,
};
const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    saveInvoiceStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    saveInvoiceSuccess: (state, action) => {
      state.loading = false;
      state.invoices.push(action.payload);
    },
    saveInvoiceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchInvoicesStart: (state) => {
      state.loading = true;
    },
    fetchInvoicesSuccess: (state, action) => {
      state.loading = false;
      state.invoices = action.payload;
    },
  },
});
export const { saveInvoiceStart, saveInvoiceSuccess, saveInvoiceFailure, fetchInvoicesStart, fetchInvoicesSuccess } = invoiceSlice.actions;
export default invoiceSlice.reducer;