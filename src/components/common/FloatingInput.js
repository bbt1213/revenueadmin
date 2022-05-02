import React from "react";

const FloatingInput = ({
  type,
  id,

  value,
  onChange,
  label,
  ...rest
}) => {
  return (
    <div className="form-floating">
      <input
        type={type}
        className="form-control mb-2"
        id={id}
        placeholder={label}
        value={value}
        onChange={onChange}
        name={id}
        {...rest}
      />
      <label for={id}>{label}</label>
    </div>
  );
};

export default FloatingInput;
