import React from "react";
// reactstrap components
import { FormGroup, Input, Button } from "reactstrap";

const InputTextLabel = props => {
  const { id, val, placeholder, type, onChange, rows } = props;
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
          rows={rows}
        />
      </FormGroup>
    </div>
  );
};

export default InputTextLabel;
