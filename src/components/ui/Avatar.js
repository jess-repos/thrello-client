import React from "react";

import "./Avatar.css";

export default function Avatar({ avatarName = "N", isAdmin }) {
  return (
    <div className={`avatar ${isAdmin ? "admin" : ""}`}>
      {avatarName[0].toUpperCase()}
    </div>
  );
}
