import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchForms = createAsyncThunk("forms/fetch", async () => {
  const saved = JSON.parse(localStorage.getItem("forms") || "[]");
  return saved;
});

export const saveFormThunk = createAsyncThunk("forms/save", async (form) => {
  const old = JSON.parse(localStorage.getItem("forms") || "[]");
  const created = { id: Date.now(), ...form };
  const updated = [created, ...old];
  localStorage.setItem("forms", JSON.stringify(updated));
  return created;
});