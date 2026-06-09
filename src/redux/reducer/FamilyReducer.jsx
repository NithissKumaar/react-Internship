import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts } from "../thunks/FamilyThunk";

const FamilyReducer = createSlice({
  name: "family",
  initialState: {
    contacts: [],
    loading: false,
  },
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => { state.loading = true; })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => { state.loading = false; });
  },
});

export const { setContacts } = FamilyReducer.actions;
export default FamilyReducer.reducer;