import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "user/fetch",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    return await res.json();
  }
);