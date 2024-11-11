import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { fetchLogin } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      return;
    }
    navigate("/votes");
  }, [user]);

  useEffect(()=>{
     if (user?._id) {
       navigate("/login");
     }
  },[])
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
