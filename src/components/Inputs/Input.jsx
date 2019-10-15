import React from "react";
// reactstrap components
import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Alert
} from "reactstrap";

const InputText = ({
  icon,
  placeholder,
  type,
  name,
  val,
  onChange,
  stateError,
  errorMessage
}) => {
  return (
    <div>
      <FormGroup className={stateError ? "has-danger" : null}>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className={icon} />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            name={name}
            value={val}
          />
        </InputGroup>
        {stateError ? (
          <Alert color="danger">
            <strong>Error!</strong> {errorMessage}
          </Alert>
        ) : null}
      </FormGroup>
    </div>
  );
};

export default InputText;
