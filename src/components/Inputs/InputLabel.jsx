import React from "react";
// reactstrap components
import { FormGroup, Input } from "reactstrap";

class InputTextLabel extends React.Component {
  render() {
    const { id, val, placeholder, type, onChange, rows, disabled } = this.props;
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
            disabled={disabled}
          />
        </FormGroup>
      </div>
    );
  }
}

export default InputTextLabel;
