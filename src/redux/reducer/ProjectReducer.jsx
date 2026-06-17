import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects } from "../thunks/ProjectThunk";

const ProjectReducer = createSlice({
  name: "project",
  initialState: {
    projects: JSON.parse(localStorage.getItem("projects")) || [],
    loading: false,
    selected: null,
  },
  reducers: {
    addProject: (state, action) => {
      state.projects.push({
        id: Date.now(),
        status: action.payload.status || "Not Started",
        ...action.payload,
      });
    },
    editProject: (state, action) => {
      state.projects = state.projects.map((p) => p.id === action.payload.id ? action.payload : p);
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
      if (state.selected?.id === action.payload) state.selected = null;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => { state.loading = true; })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => { state.loading = false; });
  },
});

export const { addProject, editProject, deleteProject, setSelected } = ProjectReducer.actions;
export default ProjectReducer.reducer;