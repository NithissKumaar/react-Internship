import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployees } from "../api/EmployeeApi";

export const fetchEmployees = createAsyncThunk("employee/fetch", async () => {
  return getEmployees();
});