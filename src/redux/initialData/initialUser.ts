import { DataStatus, UserState } from "../../types/redux";

export const initialData: UserState = {
  erorr: null,
  status: DataStatus.IDLE,
  user: null,
};
