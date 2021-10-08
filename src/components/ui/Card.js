import React from "react";

import "./Card.css";

export default function Card({ children, className, onClick }) {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
