import { createSlice } from "@reduxjs/toolkit";

const responseSlice = createSlice({
  name: "responses",
  initialState: {
    responses: JSON.parse(localStorage.getItem("responses") || "[]")
  },
  reducers: {
    saveResponse: (state, action) => {
      state.responses.unshift(action.payload);
    },
    loadResponses: (state) => {
      state.responses = JSON.parse(localStorage.getItem("responses") || "[]");
    }
  }
});

export const { saveResponse, loadResponses } = responseSlice.actions;
export default responseSlice.reducer;