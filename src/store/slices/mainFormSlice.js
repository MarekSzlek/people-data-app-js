import { createSlice } from "@reduxjs/toolkit";

const mainFormSlice = createSlice({
  name: "mainForm",
  initialState: { name: "", age: 0, date: "", resume: "" },
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    },
    changeAge(state, action) {
      state.age = action.payload;
    },
    changeDate(state, action) {
      state.date = action.payload;
    },
    changeResume(state, action) {
      state.resume = action.payload;
    },
  },
});

export const { changeName, changeAge, changeDate, changeResume } =
  mainFormSlice.actions;
export const mainFormReducer = mainFormSlice.reducer;
