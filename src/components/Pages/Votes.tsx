import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";
import {
  fetchCandidates,
  voteForCandidate,
} from "../../redux/slices/candidateSlice";
import CandidateItem from "./CandidateItem";
import { DataStatus } from "../../types/redux";

export default function Votes() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const {
    Candidate: candidates,
    status,
    erorr,
  } = useAppSelector((state) => state.candidate);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
    } else {
      dispatch(fetchCandidates());
    }
  }, [dispatch, navigate, user?._id]);

  const handleVote = (candidateId: string) => {
    if (!user?.hasVoted) {
      dispatch(voteForCandidate(candidateId));
    }
  };

  if (status === DataStatus.LOADING) return <p>Loading candidates...</p>;
  if (erorr) return <p>Error: {erorr}</p>;

  return (
    <div>
      <h2>Votes</h2>
      {candidates && candidates.length > 0 ? (
        candidates.map((candidate) => (
          <CandidateItem
            key={candidate._id}
            id={candidate._id}
            name={candidate.name}
            imageUrl={candidate.imageUrl}
            votes={candidate.votes}
            hasVoted={user?.hasVoted || false}
            onVote={handleVote}
          />
        ))
      ) : (
        <p>No candidates available</p>
      )}
    </div>
  );
}
