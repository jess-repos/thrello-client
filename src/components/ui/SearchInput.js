import React from "react";
import Button from "./Button";
import "./SearchInput.css";

export default function SearchInput() {
  return (
    <div className="search-input">
      <input type="text" placeholder="Keyword..." />
      <Button>Search</Button>
    </div>
  );
}
