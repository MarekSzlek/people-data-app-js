import { createSlice } from "@reduxjs/toolkit";
import { peopleData } from "../rawData/peopleData";

const peopleSlice = createSlice({
  name: "people",
  initialState: { data: peopleData, selectedRecordId: "" },
  reducers: {
    setSelectedRecordId(state, action) {
      state.selectedRecordId = action.payload;
    },
    editPerson(state, action) {
      state.data = state.data.map((person) => {
        if (person.id === action.payload.id) {
          return action.payload;
        }
        return person;
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
      state.data = updated;
    },
  },
});

export const { removePerson, editPerson, removeMultiple, setSelectedRecordId } =
  peopleSlice.actions;
export const peopleReducer = peopleSlice.reducer;
