import React from "react";
// reactstrap components
import { FormGroup, Input } from "reactstrap";

const InputTextLabel = ({ id, val, placeholder, type, onChange }) => {
  return (
    <div>
      <FormGroup>
        <label className="form-control-label" htmlFor={id}>
          {placeholder}
        </label>
        <Input
          className="form-control-alternative"
          defaultValue={val}
          id={id}
          name={id}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          style={{ color: "#365d8a", fontSize: "1rem" }}
          rows="10"
        />
      </FormGroup>
    </div>
  );
};

export default InputTextLabel;
