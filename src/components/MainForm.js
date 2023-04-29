import "../index.css";
import { useTranslation } from "react-i18next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPerson } from "../store";
import dayjs from "dayjs";
import * as yup from "yup";

import { Button, DatePicker, Form, Input, InputNumber, Typography } from "antd";
import {
  changeNameField,
  changeAgeField,
  changeDateField,
  changeResumeField,
} from "../store";
const { TextArea } = Input;

function MainForm({ formRef }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { name, age, date, resume } = useSelector((state) => {
    return {
      name: state.mainForm.name,
      age: state.mainForm.age,
      date: state.mainForm.date,
      resume: state.mainForm.resume,
    };
  });
  const selectedRecordId = useSelector(
    (state) => state.people.selectedRecordId
  );

  const schema = yup.object().shape({
    name: yup.string().required(t("field.required")),
    age: yup.number().positive().integer().required(t("field.required")),
    birthDate: yup.string().nullable().required(t("field.required")),
    resume: yup.string().max(250, t("Max. 250 characters")),
  });

  const yupSync = {
    async validator({ field }, value) {
      await schema.validateSyncAt(field, { [field]: value });
    },
  };

  const handleNameChange = (e) => dispatch(changeNameField(e.target.value));
  const handleAgeChange = (e) => dispatch(changeAgeField(parseInt(e) || 0));
  const handleDateChange = (e) => {
    dispatch(changeDateField(e ? e.$d.getTime() : null));
  };
  const handleResumeChange = (e) => dispatch(changeResumeField(e.target.value));

  const onFinish = ({ name, age, birthDate, resume }) => {
    if (!selectedRecordId) {
      alert(t("no.selected.alert"));
      return;
    }

    const payload = {
      id: selectedRecordId,
      name,
      age,
      birthDate: birthDate.$d.getTime(),
      resume,
    };

    console.log("Successfully submitted:", payload);
    dispatch(editPerson(payload));
  };

  const formattedDate = dayjs(date);

  const fields = [
    { name: "name", value: name },
    { name: "age", value: age },
    {
      name: "birthDate",
      value: date ? formattedDate : "",
    },
    { name: "resume", value: resume },
  ];

  return (
    <div className="form" ref={formRef}>
      <Typography.Title level={3}>{t("main.form.title")}</Typography.Title>
      <Form
        fields={fields}
        onFinish={onFinish}
        label=""
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size={"default"}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="name" label={t("Name")} rules={[yupSync]}>
          <Input onChange={handleNameChange} placeholder={t("enter.name")} />
        </Form.Item>
        <Form.Item name="age" label={t("Age")} rules={[yupSync]}>
          <InputNumber
            onChange={handleAgeChange}
            style={{ width: "160px" }}
            placeholder={t("enter.age")}
          />
        </Form.Item>
        <Form.Item name="birthDate" label={t("Birth date")} rules={[yupSync]}>
          <DatePicker onChange={handleDateChange} style={{ width: "160px" }} />
        </Form.Item>

        <Form.Item name="resume" label={t("Resume")} rules={[yupSync]}>
          <TextArea
            onChange={handleResumeChange}
            rows={4}
            placeholder={t("enter.resume")}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 20 }}>
          <Button htmlType="submit" style={{ float: "right" }}>
            {t("Submit")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default MainForm;
