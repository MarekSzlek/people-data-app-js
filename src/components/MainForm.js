import "../index.css";
import { useTranslation } from "react-i18next";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import enENDate from "antd/es/date-picker/locale/en_US";
import plPLDate from "antd/es/date-picker/locale/pl_PL";
import LocaleContext from "../LocaleContext";
import { editPerson } from "../store";
import dayjs from "dayjs";
import * as yup from "yup";

import { Button, DatePicker, Form, Input, InputNumber, Typography } from "antd";
import { changeName, changeAge, changeDate, changeResume } from "../store";
const { TextArea } = Input;

function MainForm({
  formRef,
  editedPersonId,
  nameInput,
  ageInput,
  dateInput,
  resumeInput,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { name, age, date, resume } = useSelector((state) => {
    return {
      name: state.mainForm.name,
      age: state.mainForm.Age,
      date: state.mainForm.date,
      resume: state.mainForm.resume,
    };
  });

  let schema = yup.object().shape({
    name: yup.string().required(t("Please enter your name")),
    age: yup.number().positive().integer().required(t("Please enter your age")),
    birthDate: yup.string().nullable().required(t("Please select a date")),
    resume: yup.string().max(250, t("Max. 250 characters")),
  });

  const yupSync = {
    async validator({ field }, value) {
      await schema.validateSyncAt(field, { [field]: value });
    },
  };

  const formDate = new Date(date);

  const { locale } = useContext(LocaleContext);

  // i18n.on("languageChanged", () => {
  //   Object.keys(errors).forEach((fieldName) => {
  //     setFieldTouched(fieldName);
  //   });
  // });

  const getDateLocale = (lang) => {
    switch (lang) {
      case "en":
        return enENDate;
      case "pl":
        return plPLDate;
      default:
        return enENDate;
    }
  };

  const [form] = Form.useForm();

  const handleNameChange = (e) => {
    console.log(e.target.value);
    dispatch(changeName(e.target.value));
  };
  const handleAgeChange = (e) => {
    console.log(parseInt(e) || 0);
    dispatch(changeAge(parseInt(e) || 0));
  };
  const handleDateChange = (e) => {
    console.log(e.target.value);
    dispatch(changeDate(date ? date.valueOf() : null));
  };
  const handleResumeChange = (e) => {
    console.log(e.target.value);
    dispatch(changeResume(e.target.value));
  };

  const handleSubmit = (e) => {
    console.log(e);
  };

  const onFinish = ({ name, age, birthDate, resume }) => {
    const payload = { name, age, birthDate: birthDate?.$d.getTime(), resume };
    console.log("Successfully submitted:", payload);
    console.log(editedPersonId);
    dispatch(editPerson(payload));
  };
  //const onFormLayoutChange = () => {};

  return (
    <div className="form" ref={formRef}>
      <Typography.Title level={3}>{t("main.form.title")}</Typography.Title>
      <Form
        form={form}
        onFinish={onFinish}
        label=""
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        //onValuesChange={onFormLayoutChange}
        size={"default"}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="name" label={t("Name")} rules={[yupSync]}>
          <Input
            ref={nameInput}
            value={name}
            onChange={handleNameChange}
            placeholder="Please input your name"
          />
        </Form.Item>
        <Form.Item name="age" label={t("Age")} rules={[yupSync]}>
          <InputNumber
            ref={ageInput}
            value={age || ""}
            onChange={handleAgeChange}
            style={{ width: "160px" }}
            placeholder="Please input your age"
          />
        </Form.Item>
        <Form.Item name="birthDate" label={t("Birth date")} rules={[yupSync]}>
          <DatePicker
            ref={dateInput}
            value={formDate ? dayjs(formDate) : null}
            onChange={(value) => handleDateChange({ target: { value } })}
            locale={getDateLocale(locale)}
            style={{ width: "160px" }}
          />
        </Form.Item>
        <Form.Item name="resume" label={t("Resume")} rules={[yupSync]}>
          <TextArea
            ref={resumeInput}
            value={resume}
            onChange={handleResumeChange}
            rows={4}
            placeholder="Please input your resume"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 20 }}>
          <Button
            htmlType="submit"
            onSubmit={handleSubmit}
            style={{ float: "right" }}
          >
            {t("Submit")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default MainForm;
