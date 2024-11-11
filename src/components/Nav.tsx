import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../redux/store/store";
import { logOutUser } from "../redux/slices/userSlice";

export default function Nav() {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    dispatch(logOutUser());
    navigate("/login");
  };

  return (
    <div className="nav">
      {user.user ? (
        <>
          <NavLink to={"/votes"}>Votes</NavLink>
          {user.user.isAdmin && (
            <NavLink to={"/statistics"}>Statistics</NavLink>
          )}
          <button onClick={logOut}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/register"}>Register</NavLink>
        </>
      )}
    </div>
  );
}
