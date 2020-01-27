import React from "react";
// reactstrap components
import { FormGroup, Input } from "reactstrap";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

const components = {
  DropdownIndicator: null
};

class CreatableSelectLabel extends React.Component {
  render() {
    const {
      id,
      selected,
      val,
      placeholder,
      onChange,
      onInputChange,
      onKeyDown,
      menuIsOpen,
      options
    } = this.props;
    const animatedComponents = makeAnimated();
    return (
      <div>
        <FormGroup>
          <label className="form-control-label" htmlFor={id}>
            {placeholder}
          </label>
          <CreatableSelect
            components={components}
            inputValue={val}
            isClearable
            isMulti
            menuIsOpen={menuIsOpen}
            onChange={onChange}
            onInputChange={onInputChange}
            onKeyDown={onKeyDown}
            placeholder="Type something and press enter..."
            value={selected}
            options={options}
          />
          {/* <Select
            placeholder={placeholder}
            closeMenuOnSelect={false}
            components={animatedComponents}
            value={selected}
            isMulti
            options={val}
            formatGroupLabel={formatGroupLabel ? formatGroupLabel : undefined}
            onChange={onChange}
            styles={styles ? styles : undefined}
          /> */}
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

export default CreatableSelectLabel;
