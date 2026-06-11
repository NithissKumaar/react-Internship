import { createSlice } from "@reduxjs/toolkit";

const EmployeeReducer = createSlice({
  name: "employee",
  initialState: {
    employees: JSON.parse(localStorage.getItem("employees")) || [],
  },
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter((_, i) => i !== action.payload);
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
  },
});

export const { addEmployee, deleteEmployee } = EmployeeReducer.actions;
export default EmployeeReducer.reducer;