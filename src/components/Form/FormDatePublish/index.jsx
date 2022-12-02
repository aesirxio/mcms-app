import React, { useState, lazy } from "react";
import { Icon } from "@iconify/react";
import { FORMAT_DATE, FORMAT_TIME } from "../../../constants/FormFieldType";
import "./index.scss";

const DatePicker = lazy(() => import("react-datepicker"));

const FormDatePushlish = ({ field }) => {
  const [startDate, setStartDate] = useState(
    field.defaultValue ? new Date(field.defaultValue) : null
  );
  console.log(startDate);
  return (
    <div className="d-flex align-items-center bg-white position-relative date-picker">
      <div className="calendar-icon calendar-icon-end position-absolute top-50 translate-middle-y">
        <Icon icon="bi:clock" className="text-gray-400" />
      </div>
      <DatePicker
        dateFormat={`${FORMAT_DATE} ${FORMAT_TIME}`}
        selected={startDate}
        onChange={(date) => {
          field.changed(date);
          setStartDate(date);
        }}
        showTimeSelect
        adjustDateOnChange
        className={`${field.classNameInput} pe-3 ps-16 py-1 outline-none position-relative border-1 rounded-1`}
      />
    </div>
  );
};

export default FormDatePushlish;
