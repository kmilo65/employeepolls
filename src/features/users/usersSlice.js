import { createSlice } from "@reduxjs/toolkit";

const initialState = [{}];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    allUsers: (state, payload) => {},
  },
});

export const { allUsers } = usersSlice.actions;

export default usersSlice.reducer;
