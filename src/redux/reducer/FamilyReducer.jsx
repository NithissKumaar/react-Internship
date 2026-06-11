import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts } from "../thunks/FamilyThunk";

const FamilyReducer = createSlice({
  name: "family",

  initialState: {
    contacts: JSON.parse(
      localStorage.getItem("familyContacts")
    ) || [],
    loading: false,
  },

  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;

        // Update only if API returns data
        if (
          Array.isArray(action.payload) &&
          action.payload.length > 0
        ) {
          state.contacts = action.payload;
        }
      })

      .addCase(fetchContacts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setContacts } = FamilyReducer.actions;

export default FamilyReducer.reducer;