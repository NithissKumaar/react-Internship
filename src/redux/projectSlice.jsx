import { createSlice } from "@reduxjs/toolkit";

const projectSlice =
createSlice({
  name:"project",

  initialState:{
    projects:[]
  },

  reducers:{

    addProject:
    (state,action)=>{

      state.projects.push({
        id:Date.now(),

        ...action.payload
      });

    }

  }
});

export const {
 addProject
}=projectSlice.actions;

export default projectSlice.reducer;