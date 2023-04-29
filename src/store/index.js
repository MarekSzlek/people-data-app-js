import { configureStore } from "@reduxjs/toolkit";
import {
  peopleReducer,
  removePerson,
  editPerson,
  removeMultiple,
} from "./slices/peopleSlice";
import {
  mainFormReducer,
  changeName,
  changeAge,
  changeDate,
  changeResume,
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
  changeName,
  changeAge,
  changeDate,
  changeResume,
};
