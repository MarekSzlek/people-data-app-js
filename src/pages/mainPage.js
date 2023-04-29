import { useRef, useEffect } from "react";
import MainTable from "../components/MainTable";
import MainForm from "../components/MainForm";
import { useDispatch } from "react-redux";
import { changeName, changeAge, changeDate, changeResume } from "../store";

function MainPage() {
  const formRef = useRef(null);
  const nameInput = useRef(null);
  const ageInput = useRef(null);
  const dateInput = useRef(null);
  const resumeInput = useRef(null);

  useEffect(() => {}, [formRef, nameInput, ageInput, dateInput, resumeInput]);
  const dispatch = useDispatch();

  let editedPersonId = null;
  const handleEdit = (person) => {
    editedPersonId = person.id;
    console.log(`Editing record of ${person.name} (id: ${person.id})`);
    formRef.current.scrollIntoView({ behavior: "smooth" });
    dispatch(changeName(person.name));
    dispatch(changeAge(person.age));
    // dispatch(changeAge(person.name));
    // dispatch(changeAge(person.name));
  };

  return (
    <div className="main">
      <div>
        <MainTable handleEdit={handleEdit} />
      </div>
      <div>
        <MainForm
          formRef={formRef}
          editedPersonId={editedPersonId}
          nameInput={nameInput}
          ageInput={ageInput}
          dateInput={dateInput}
          resumeInput={resumeInput}
        />
      </div>
    </div>
  );
}

export default MainPage;
