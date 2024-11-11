import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";

export default function Statistics() {
  const user = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    
    if (user?._id && !user?.isAdmin) {
      navigate("/votes");
    }
    if(!user._id)navigate('/login')
  }, []);
  return <div>Statistics</div>;
}
