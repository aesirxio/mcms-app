import React from 'react';
import { Form } from 'react-bootstrap';

function FormCheckBox({ field }) {
  if (!field.option) {
    return null;
  }
  return field.option.map((item, index) => {
    return (
      <React.Fragment key={index}>
        <Form.Check
          inline
          label={item.label}
          type={'radio'}
          name={field.key}
          //   checked={item.value === field.value}
          id={`radio-checkbox-${index}`}
        />
      </React.Fragment>
    );
  });
}

export default FormCheckBox;
