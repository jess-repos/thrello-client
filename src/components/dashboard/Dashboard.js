import React, { useState } from "react";
import Boards from "./boards/Boards";
import Nav from "../nav/Nav";
import "./Dashboard.css";
export default function Dashboard() {
  return (
    <div className="dashboard">
      <Nav />
      <Boards />
    </div>
  );
}
