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
          create
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
        </FormGroup>
      </div>
    );
  }
}

export default SelectLabel;
