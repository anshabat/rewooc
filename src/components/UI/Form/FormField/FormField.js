import "./FormField.scss";
import React from "react";


const FormField = props => {
  const {
    className = "",
    ...restProps
  } = props;

  return (
    <div className={`pc-form-field ${className}`.trim()}>
      <input
        className={`pc-form-field__control`}
        {...restProps}
      />
    </div>
  );
};

export default FormField;