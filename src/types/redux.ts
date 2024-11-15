// types/redux.ts
import { ICandidate } from "./candidate";
import { IUser } from "./users";

export enum DataStatus {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  IDLE = "IDLE",
}

export interface UserState {
  isAdmin?: boolean;
  _id?: string;
  erorr: string | null;
  status: DataStatus;
  user: IUser | null;
}

export interface CandidateState {
  erorr: string | null;
  status: DataStatus;
  Candidate: ICandidate[] | null;
  statistics: ICandidate[] | null; // הוספת שדה הסטטיסטיקות
}
