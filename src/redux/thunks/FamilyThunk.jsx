import { createAsyncThunk } from "@reduxjs/toolkit";
import FamilyAPI from "../api/FamilyAPI";

export const fetchContacts = createAsyncThunk(
  "family/fetch",
  async () => FamilyAPI.getContacts()
);