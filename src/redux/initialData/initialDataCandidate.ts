import { CandidateState, DataStatus } from "../../types/redux";

export const initialDataCan: CandidateState = {
  erorr: null,
  status: DataStatus.IDLE,
  Candidate: null,
  statistics:null
};
