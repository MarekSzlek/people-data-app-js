import { createSlice } from "@reduxjs/toolkit";
import { peopleData } from "../rawData/peopleData";

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    data: peopleData,
  },
  reducers: {
    editPerson(state, action) {
      const editedPerson = action.payload;
      return state.data.map((person) => {
        console.log(person.id === action.payload.id);
        return person.id === action.payload.id ? editedPerson : person;
      });
    },
    removePerson(state, action) {
      const updated = state.data.filter((person) => {
        return person.id !== action.payload;
      });
      state.data = updated;
    },
    removeMultiple(state, action) {
      const updated = state.data.filter((person) => {
        return !action.payload.includes(person.id);
      });
      console.log(state.data);
      state.data = updated;
    },
  },
});

export const { removePerson, editPerson, removeMultiple } = peopleSlice.actions;
export const peopleReducer = peopleSlice.reducer;
