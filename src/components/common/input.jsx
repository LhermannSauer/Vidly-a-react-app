import React from "react";

const Input = ({ name, type, label, value, onChange, small }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className="form-control"
        value={value}
        name={name}
        onChange={onChange}
        id={name}
        placeholder={`Please enter your ${label}`}
      />
      {small && <small className="text-primary">{small}</small>}
    </div>
  );
};

export default Input;
