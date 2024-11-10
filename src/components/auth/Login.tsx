import React, { useState } from "react";
import { useAppDispatch } from "../../redux/store/store";
import { fetchLogin } from "../../redux/slices/userSlice";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchLogin({ userName, password }));
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="user name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
