import React from "react";

import "./InputType.css";

export default function InputType({
  type,
  onChange,
  value,
  id,
  label,
  startIcon,
  active,
  disabled,
}) {
  return (
    <div className="input-type">
      <label
        htmlFor={id}
        className={`${disabled ? "disabled" : ""} ${active ? "active" : ""}`}
      >
        {startIcon && <i className={startIcon}></i>}
        {label}
      </label>
      <input id={id} type={type} value={value} onChange={onChange} />
    </div>
  );
}
