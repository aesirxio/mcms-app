import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

function FormCheckBox({ field }) {
  if (!field.option) {
    return null;
  }
  const [selectedValue, setSelectedValue] = useState(field.getValueSelected);

  useEffect(() => {
    if (field.getValueSelected) {
      setSelectedValue(field.getValueSelected);
    }
  }, [field.getValueSelected]);
  const handleChange = (data) => {
    field.changed(data);
  };
  return (
    <div className={`${field.classNameInput}`}>
      {field.option.map((item, index) => {
        return (
          <Form.Check
            inline
            label={item.label}
            type={'radio'}
            name={field.key}
            key={index}
            checked={selectedValue === field.value}
            id={`${index === 0 ? 'Yes' : 'No'}`}
            onClick={handleChange}
            onChange={handleChange}
          />
        );
      })}
    </div>
  );
}

export default FormCheckBox;
