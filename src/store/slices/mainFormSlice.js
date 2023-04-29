import { createSlice } from "@reduxjs/toolkit";

const mainFormSlice = createSlice({
  name: "mainForm",
  initialState: { name: "", age: null, date: null, resume: "" },
  reducers: {
    changeNameField(state, action) {
      state.name = action.payload;
    },
    changeAgeField(state, action) {
      state.age = action.payload;
    },
    changeDateField(state, action) {
      state.date = action.payload;
    },
    changeResumeField(state, action) {
      state.resume = action.payload;
    },
  },
});

export const {
  changeNameField,
  changeAgeField,
  changeDateField,
  changeResumeField,
} = mainFormSlice.actions;
export const mainFormReducer = mainFormSlice.reducer;
