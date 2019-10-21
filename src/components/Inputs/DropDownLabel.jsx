import React from "react";
// reactstrap components
import {
  FormGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";

const DropDownLabel = props => {
  const { id, val, placeholder, type, onChange, rows } = props;
  return (
    <div>
      <FormGroup>
        <label className="form-control-label" htmlFor={id}>
          {placeholder}
        </label>
        <UncontrolledDropdown style={{ display: "block" }} group>
          <DropdownToggle caret color="info" style={{ width: "100%" }}>
            {placeholder}
          </DropdownToggle>
          <DropdownMenu style={{ width: "100%" }}>
            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
              Action
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
              Another action
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
              Something else here
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
              Separated link
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </FormGroup>
    </div>
  );
};

export default DropDownLabel;
