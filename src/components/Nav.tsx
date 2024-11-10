import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <div className="nav">
      <NavLink to={"/login"}>login</NavLink>
      <NavLink to={"/register"}>register</NavLink>
      <NavLink to={"/votes"}>votes</NavLink>
      <NavLink to={"/statitics"}>statistics</NavLink>
      <button onClick={() => alert("logout")}>logout</button>
    </div>
  );
}
