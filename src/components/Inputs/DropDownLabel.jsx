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
  const { id, val, placeholder, onChange, name } = props;
  return (
    <div>
      <FormGroup>
        <label className="form-control-label" htmlFor={id}>
          {name}
        </label>
        <UncontrolledDropdown style={{ display: "block" }} group>
          <DropdownToggle
            caret
            color="primary"
            style={{
              width: "100%",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}
          >
            {placeholder}
          </DropdownToggle>
          <DropdownMenu
            style={{ width: "100%", maxHeight: "300px", overflow: "auto" }}
          >
            {Object.keys(val).map(key => {
              return (
                <DropdownItem
                  href="#pablo"
                  id={key}
                  key={key}
                  onClick={onChange}
                >
                  {val[key].title}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </UncontrolledDropdown>
      </FormGroup>
    </div>
  );
};

export default DropDownLabel;