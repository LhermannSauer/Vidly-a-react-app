import React from "react";

const Input = ({ name, label, small, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        id={name}
        name={name}
        className="form-control"
        placeholder={`Please enter your ${label}`}
      />
      {small && <small className="text-primary primary">{small}</small>}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
