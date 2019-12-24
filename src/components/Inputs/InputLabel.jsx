import React from "react";
// reactstrap components
import { FormGroup, Input, Alert } from "reactstrap";

class InputTextLabel extends React.Component {
  render() {
    const {
      id,
      val,
      placeholder,
      type,
      onChange,
      rows,
      disabled,
      stateError,
      errorMessage
    } = this.props;
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
          <p></p>
          {stateError ? (
            <Alert color="danger">
              <strong>Error!</strong> {errorMessage}
            </Alert>
          ) : null}
        </FormGroup>
      </div>
    );
  }
}

export default InputTextLabel;
