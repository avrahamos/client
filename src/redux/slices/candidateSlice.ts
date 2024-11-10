import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { DataStatus, CandidateState} from "../../types/redux";
import { ICandidate } from "../../types/candidate";
import { initialDataCan } from "../initialData/initialDataCandidate";


export const fetchCandidates = createAsyncThunk(
  "candidates/getList",
  async (_, thunkApi) => {
    try {
      const res = await fetch("http://localhost:2222/api/candidates/");
      if (res.status != 200) {
        thunkApi.rejectWithValue("Can't get the list, please try again");
      }
      const data = await res.json();
      thunkApi.fulfillWithValue(data);
    } catch (err) {
      thunkApi.rejectWithValue("Can't get the list, please try again");
    }
  }
);

const candidatesSlice = createSlice({
  name: "candidates",
  initialState:initialDataCan,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CandidateState>) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.erorr = null;
        state.Candidate = [];
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.erorr = null;
        state.Candidate = action.payload as unknown as ICandidate[];
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.erorr = action.error as string;
        state.Candidate = [];
      });
  },
});

export default candidatesSlice;
