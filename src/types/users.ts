export interface IUser {
  _id: string;
  userName: string;
  isAdmin: boolean;
  hasVoted: boolean;
  votedFor: string | null;
}
