import React from 'react';
import { Form } from 'react-bootstrap';

function FormCheckBox({ field }) {
  if (!field.option) {
    return null;
  }
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
            //   checked={item.value === field.value}
            id={`radio-checkbox-${index}`}
          />
        );
      })}
    </div>
  );
}

export default FormCheckBox;
