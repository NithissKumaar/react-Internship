import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/UserThunk";

const UserReducer = createSlice({
  name: "user",
  initialState: {
    users: JSON.parse(localStorage.getItem("users")) || [],
    loading: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.unshift({
        id: Date.now(),
        ...action.payload,
      });
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (state.users.length === 0) {
          state.users = action.payload;
        }
      })
      .addCase(fetchUsers.rejected, (state) => { state.loading = false; });
  },
});

export const { addUser, deleteUser } = UserReducer.actions;
export default UserReducer.reducer;