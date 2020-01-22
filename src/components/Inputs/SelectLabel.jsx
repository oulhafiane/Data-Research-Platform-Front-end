import React from "react";
// reactstrap components
import { FormGroup } from "reactstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";

class SelectLabel extends React.Component {
  render() {
    const {
      id,
      selected,
      val,
      formatGroupLabel,
      placeholder,
      onChange,
      styles
    } = this.props;
    const animatedComponents = makeAnimated();
    return (
      <div>
        <FormGroup>
          <label className="form-control-label" htmlFor={id}>
            {placeholder}
          </label>
          <Select
            placeholder={placeholder}
            closeMenuOnSelect={false}
            components={animatedComponents}
            value={selected}
            isMulti
            options={val}
            formatGroupLabel={formatGroupLabel ? formatGroupLabel : undefined}
            onChange={onChange}
            styles={styles ? styles : undefined}
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
