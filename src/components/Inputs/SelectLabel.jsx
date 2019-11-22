import React from "react";
// reactstrap components
import { FormGroup, Input } from "reactstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";

class SelectLabel extends React.Component {
  render() {
    const {
      id,
      selected,
      val,
      placeholder,
      type,
      onChange,
      rows,
      disabled,
      label
    } = this.props;
    const options = Object.keys(val).map(key => ({
      value: val[key].id,
      label: val[key].title
    }));
    const animatedComponents = makeAnimated();
    return (
      <div>
        <FormGroup>
          {label ? (
            <label className="form-control-label" htmlFor={id}>
              {placeholder}
            </label>
          ) : null}
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            value={selected}
            isMulti
            options={options}
            onChange={onChange}
          />
          {/* <Input
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
          /> */}
        </FormGroup>
      </div>
    );
  }
}

export default SelectLabel;
