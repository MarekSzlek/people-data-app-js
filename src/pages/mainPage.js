import { useRef, useEffect } from "react";
import MainTable from "../components/MainTable";
import MainForm from "../components/MainForm";
import { useDispatch } from "react-redux";
import {
  changeNameField,
  changeAgeField,
  changeDateField,
  changeResumeField,
  setSelectedRecordId,
} from "../store";

function MainPage() {
  const formRef = useRef(null);

  useEffect(() => {}, [formRef]); //
  const dispatch = useDispatch();

  const handleEditClick = (person) => {
    console.log(`Editing record of ${person.name} (id: ${person.id})`);
    dispatch(setSelectedRecordId(person.id));

    dispatch(changeNameField(person.name));
    dispatch(changeAgeField(person.age));
    dispatch(changeDateField(person.birthDate));
    dispatch(changeResumeField(person.resume));

    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="main">
      <div>
        <MainTable handleEditClick={handleEditClick} />
      </div>
      <div>
        <MainForm formRef={formRef} />
      </div>
    </div>
  );
}

export default MainPage;
