import React from "react";
// reactstrap components
import InputTextLabel from "./InputLabel";

const InputToogleHidden = ({
  id,
  val,
  placeholder,
  type,
  onChange,
  onClick,
  showInput
}) => {
  return (
    <div>
      <hr className="my-4" />
      <h6
        className="heading-small text-muted mb-4"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        {showInput ? (
          <i className="ni ni-fat-delete" />
        ) : (
          <i className="ni ni-fat-add" />
        )}
        &nbsp;{placeholder}
      </h6>
      {showInput ? (
        <div className="pl-lg-4">
          <InputTextLabel
            id={id}
            type={type}
            placeholder={placeholder}
            val={val}
            onChange={onChange}
            rows="5"
          />
        </div>
      ) : null}
    </div>
  );
};

export default InputToogleHidden;
