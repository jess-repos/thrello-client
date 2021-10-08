import React from "react";

import "./Button.css";

export default function Button({
  children,
  type,
  onClick,
  iconOnly,
  startIcon,
  disabled,
  variant,
}) {
  if (iconOnly) {
    return (
      <button
        onClick={onClick}
        type={type || "button"}
        className={`button ${disabled && "disabled"}`}
      >
        <i className={iconOnly}></i>
      </button>
    );
  }
  return (
    <button
      onClick={disabled ? null : onClick}
      type={type || "button"}
      className={`button ${disabled && "disabled"} ${variant}`}
    >
      {startIcon && <i className={startIcon}></i>}
      {children}
    </button>
  );
}
