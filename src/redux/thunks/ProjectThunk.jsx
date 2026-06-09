import { createAsyncThunk } from "@reduxjs/toolkit";
import ProjectAPI from "../api/ProjectAPI";

export const fetchProjects = createAsyncThunk(
  "project/fetch",
  async () => ProjectAPI.getProjects()
);