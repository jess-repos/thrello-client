import React from "react";
import "./Input.css";

export default function Input({
  className,
  type,
  value,
  onChange,
  placeholder,
  fullWidth
}) {
  return (
    <input
      type={type || "text"}
      value={value}
      onChange={onChange}
      className={`input ${fullWidth && "full-width"} ${className}`}
      placeholder={placeholder}
    />
  );
}
