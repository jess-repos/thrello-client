import React from "react";
import "./Alert.css";

export default function Alert({ children, variant }) {
  return <div className={`alert ${variant}`}>{children}</div>;
}
