import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../redux/reducer/ProjectReducer";
import EmployeeReducer from "../redux/reducer/EmployeeReducer";
import userReducer from "../redux/reducer/UserReducer";
import localStorageMiddleware from "../redux/middleware/localStorageMiddleware";
import employeeStorageMiddleware from "../redux/middleware/employeeStorageMiddleware";
import userStorageMiddleware from "../redux/middleware/userStorageMiddleware";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    employee: EmployeeReducer,
    user: userReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(
      localStorageMiddleware,
      employeeStorageMiddleware,
      userStorageMiddleware
    ),
});