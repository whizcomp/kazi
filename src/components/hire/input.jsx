import React from "react";
const Input = ({ name, label, type, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        className="form-control"
      />
      {error && <div style={{ color: "red" }}>{`*${error}`}</div>}
    </div>
  );
};

export default Input;
