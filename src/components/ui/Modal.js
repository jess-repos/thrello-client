import React from "react";
import reactDom from "react-dom";

import "./Modal.css";

import Card from "./Card";
const Backdrop = ({ onClose }) => {
  return <div className="backdrop" onClick={onClose}></div>;
};

export default function Modal({ onClose, show, children, className }) {
  if (!show) return null;
  return reactDom.createPortal(
    <>
      <Backdrop onClose={onClose} />
      <Card className={`modal ${className}`}>{children}</Card>
    </>,
    document.getElementById("modal")
  );
}
