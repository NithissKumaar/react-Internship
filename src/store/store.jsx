import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../redux/reducer/ProjectReducer";
import familyReducer from "../redux/reducer/FamilyReducer";
import userReducer from "../redux/reducer/UserReducer";
import localStorageMiddleware from "../redux/middleware/localStorageMiddleware";
import familyStorageMiddleware from "../redux/middleware/familyStorageMiddleware";
import userStorageMiddleware from "../redux/middleware/userStorageMiddleware";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    family: familyReducer,
    user: userReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(
      localStorageMiddleware,
      familyStorageMiddleware,
      userStorageMiddleware
    ),
});