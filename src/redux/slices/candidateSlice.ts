import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { DataStatus, CandidateState } from "../../types/redux";
import { ICandidate } from "../../types/candidate";
import { initialDataCan } from "../initialData/initialDataCandidate";

export const fetchCandidates = createAsyncThunk(
  "candidates/getList",
  async (_, thunkApi) => {
    try {
      const token = localStorage.getItem("authorization");

      const res = await fetch("http://localhost:3000/api/candidates", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        return thunkApi.rejectWithValue(`Server error: ${errorText}`);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue("Can't get the list, please try again");
    }
  }
);

export const voteForCandidate = createAsyncThunk(
  "candidates/vote",
  async (candidateId: string, thunkApi) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/api/candidates/vote/${candidateId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        return thunkApi.rejectWithValue(`Server error: ${errorText}`);
      }

      const updatedCandidate = await res.json();
      return updatedCandidate;
    } catch (err) {
      return thunkApi.rejectWithValue("Can't vote, please try again");
    }
  }
);

const candidatesSlice = createSlice({
  name: "candidates",
  initialState: initialDataCan,
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
        state.Candidate = action.payload as ICandidate[];
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.erorr = action.payload as string;
        state.Candidate = [];
      })
      .addCase(voteForCandidate.fulfilled, (state, action) => {
        const updatedCandidate = action.payload as ICandidate;
        const index = state.Candidate!.findIndex(
          (c) => c._id === updatedCandidate._id
        );
        if (index !== -1) {
          state.Candidate![index] = updatedCandidate;
        }
      })
      .addCase(voteForCandidate.rejected, (state, action) => {
        state.erorr = action.payload as string;
      });
  },
});

export default candidatesSlice;
