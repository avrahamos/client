import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { ICandidate } from "../../types/candidate";
import { voteForCandidate } from "../../redux/slices/candidateSlice";
import { fetchProfileUpdate } from "../../redux/slices/userSlice";
import { socket } from "../../main";

interface Props {
  candidate: ICandidate;
}

export default function CandidateItem({ candidate }: Props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleVote = async () => {
    if (user?.hasVoted) {
      console.log("User has already voted.");
      return;
    }

    try {
      const voteResponse = await dispatch(
        voteForCandidate({ candidateId: candidate._id, userId: user?._id! })
      ).unwrap();
      console.log("Vote response:", voteResponse);

      if (voteResponse && voteResponse.status === "DONE") {
        await dispatch(fetchProfileUpdate(user?._id!));
        socket.emit("new vote", { user: user?.userName });
        console.log("Profile updated with hasVoted set to true.");
      }
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  return (
    <div className="vote-card">
      <h1>
        {candidate.name} <span className="badge">{candidate.votes}</span>
      </h1>
      <button onClick={handleVote} disabled={user?.hasVoted}>
        {user?.hasVoted ? "Already Voted" : "Vote"}
      </button>
    </div>
  );
}
