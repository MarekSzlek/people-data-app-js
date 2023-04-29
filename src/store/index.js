import { configureStore } from "@reduxjs/toolkit";
import {
  peopleReducer,
  removePerson,
  editPerson,
  removeMultiple,
  setSelectedRecordId,
} from "./slices/peopleSlice";
import {
  mainFormReducer,
  changeNameField,
  changeAgeField,
  changeDateField,
  changeResumeField,
} from "./slices/mainFormSlice";

const store = configureStore({
  reducer: {
    people: peopleReducer,
    mainForm: mainFormReducer,
  },
});

export {
  store,
  removePerson,
  editPerson,
  removeMultiple,
  changeNameField,
  changeAgeField,
  changeDateField,
  changeResumeField,
  setSelectedRecordId,
};
