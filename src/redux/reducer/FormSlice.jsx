import { createSlice } from "@reduxjs/toolkit";
import { fetchForms, saveFormThunk } from "../thunks/FormThunk";

const formSlice = createSlice({
  name: "forms",
  initialState: { forms: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForms.pending, (state) => { state.loading = true; })
      .addCase(fetchForms.fulfilled, (state, action) => { state.loading = false; state.forms = action.payload; })
      .addCase(saveFormThunk.pending, (state) => { state.loading = true; })
      .addCase(saveFormThunk.fulfilled, (state, action) => { state.loading = false; state.forms.unshift(action.payload); })
      .addCase(saveFormThunk.rejected, (state) => { state.loading = false; });
  }
});

export default formSlice.reducer;