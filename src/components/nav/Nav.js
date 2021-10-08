import React from "react";
import reactDom from "react-dom";

import logo from "../../assets/Logo.svg";
import { useAuth } from "../../context/AuthContext";
import { useBoard } from "../../context/BoardContext";
import Avatar from "../ui/Avatar";
import SearchInput from "../ui/SearchInput";
import "./Nav.css";

export default function Nav({ children }) {
  const { user, logout } = useAuth();
  const { clearBoard } = useBoard();
  const name = user.username;

  const logoutHandler = async () => {
    await clearBoard();
    await logout();
  };
  return reactDom.createPortal(
    <div className="nav">
      <div className="brand">
        <img src={logo} alt="" />
        <h3>Thrello</h3>
      </div>  
      {children}
      <div className="profile">
        <SearchInput />
        <div className="profile-avatar" onClick={logoutHandler}>
          <Avatar avatarName={name} />
          <h3>{name}</h3>
          <i className="fas fa-caret-down"></i>
        </div>
      </div>
    </div>,
    document.getElementById("nav")
  );
}
