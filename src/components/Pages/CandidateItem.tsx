import React from "react";

interface Props {
  id: string;
  name: string;
  imageUrl: string;
  votes: number;
  hasVoted: boolean;
  onVote: (id: string) => void;
}

export default function CandidateItem({
  id,
  name,
  imageUrl,
  votes,
  hasVoted,
  onVote,
}: Props) {
  return (
    <div className="candidate">
      <img
        src={imageUrl}
        alt={`${name}'s profile`}
        className="candidate-image"
      />
      <p>{name}</p>
      <p>Votes: {votes}</p>
      <button onClick={() => onVote(id)} disabled={hasVoted}>
        Vote
      </button>
    </div>
  );
}
