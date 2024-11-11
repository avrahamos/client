import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/store/store";
import { ColumnChart } from "@opd/g2plot-react";
import { fetchStatistcs } from "../../redux/slices/candidateSlice";

export default function Statistics() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { Candidate } = useAppSelector((state) => state.candidate); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
    } else if (!user.isAdmin) {
      navigate("/votes");
    } else {
      dispatch(fetchStatistcs()); 
    }
  }, [user, navigate, dispatch]);

  const config = {
    xField: "name",
    yField: "votes",
    smooth: true,
    meta: {
      value: {
        max: 15,
      },
    },
  };

  return (
    <div style={{ padding: "70px" }}>
      <h1>Statistics</h1>
      {Candidate && Candidate.length > 0 ? (
        <ColumnChart
          {...config}
          height={400}
          data={Candidate.map((c) => ({ name: c.name, votes: c.votes }))}
        />
      ) : (
        <p>Loading candidate statistics...</p>
      )}
    </div>
  );
}
