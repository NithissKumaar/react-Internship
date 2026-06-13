import { configureStore } from "@reduxjs/toolkit";
import responseReducer from "../redux/reducer/responseSlice";
import projectReducer from "../redux/reducer/ProjectReducer";
import EmployeeReducer from "../redux/reducer/EmployeeReducer";
import userReducer from "../redux/reducer/UserReducer";
import formReducer from "../redux/reducer/formSlice";
import localStorageMiddleware from "../redux/middleware/localStorageMiddleware";
import employeeStorageMiddleware from "../redux/middleware/employeeStorageMiddleware";
import userStorageMiddleware from "../redux/middleware/userStorageMiddleware";
import responseStorageMiddleware from "../redux/middleware/ResponseStorageMiddleware";
import invoiceSlice from "../redux/reducer/invoiceSlice";
import {invoiceMiddleware} from "../redux/middleware/InvoiceMiddleware";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    employee: EmployeeReducer,
    user: userReducer,
    forms: formReducer,
    responses: responseReducer,
    invoices: invoiceSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(
    localStorageMiddleware,
    employeeStorageMiddleware,
    userStorageMiddleware,
    responseStorageMiddleware,
    invoiceMiddleware,
  ),
});