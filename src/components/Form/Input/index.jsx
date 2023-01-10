import React from 'react';
import { Form } from 'react-bootstrap';

const Input = ({ field }) => {
  // const [mgsError, setMsError] = useState('');
  const handleChange = (e) => {
    if (Object.prototype.hasOwnProperty.call(field, 'changed')) {
      e.target.value = e.target.value.normalize('NFKC');
      field.changed(e);
    }
  };
  const handleOnblur = () => {
    // setMsError(Object.values(field.blurred.errorMessages));
    field.blurred.showMessageFor();
  };
  return (
    <>
      <Form.Control
        as="input"
        defaultValue={field.value ?? ''}
        type={field.typeFormat ? (field.typeFormat === 11 ? 'password' : 'text') : 'text'}
        id={field.key}
        onChange={(e) => handleChange(e)}
        onPaste={field.pasted ?? undefined}
        className={`${field.classNameInput}`}
        onBlur={() => handleOnblur()}
        placeholder={field.placeholder ?? undefined}
        readOnly={field.readOnly}
        disabled={field.disabled}
      />
      {field.validation &&
        field.blurred.message(field.label, field.value, field.validation, {
          className: 'text-danger',
        })}
      {/* {Object.values(field.blurred.errorMessages) && (
        <span className="text-danger">{mgsError}</span>
      )} */}
    </>
  );
};

export default Input;
