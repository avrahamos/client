import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { fetchRegister } from "../../redux/slices/userSlice";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (user?._id) {
      navigate("/votes");
    }
  }, []);
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      fetchRegister({ userName, password, isAdmin })
    );
    if (fetchRegister.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleRegister} className="register-form">
      <input
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button
        type="button"
        onClick={() => setIsAdmin((prev) => !prev)}
        className={`admin-button ${isAdmin ? "active" : ""}`}
      >
        I am Admin
      </button>
      <button type="submit" className="submit-button">
        Register
      </button>
    </form>
  );
}
