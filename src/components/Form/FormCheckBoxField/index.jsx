import { Form } from "react-bootstrap";

function FormCheckBox({ field }) {
  if (!field.option) {
    return null;
  }
  return field.option.map((item, index) => {
    return (
      <>
        <Form.Check
          inline
          label={item.label}
          type={"radio"}
          name={field.key}
          //   checked={item.value === field.value}
          id={`radio-checkbox-${index}`}
        />
      </>
    );
  });
}

export default FormCheckBox;
