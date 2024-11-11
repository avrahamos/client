import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { fetchCandidates } from "../../redux/slices/candidateSlice";
import CandidateItem from "./CandidateItem";

export default function Votes() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const { Candidate } = useAppSelector((state) => state.candidate);

  useEffect(() => {
    if (!user?._id) navigate("/login");
    dispatch(fetchCandidates());
  }, [user, dispatch, navigate]);

  return (
    <div className="vote-list">
      {Candidate && Candidate.length > 0 ? (
        Candidate.map((candidate) => (
          <CandidateItem key={candidate._id} candidate={candidate} />
        ))
      ) : (
        <p>No candidates available.</p>
      )}
    </div>
  );
}
