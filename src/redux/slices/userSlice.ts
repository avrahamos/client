import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { DataStatus, UserState } from "../../types/redux";
import { IUser } from "../../types/users";
import { initialData } from "../initialData/initialUser";

export const fetchLogin = createAsyncThunk(
  "user/login",
  async (user: { userName: string; password: string }, thunkApi) => {
    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return thunkApi.rejectWithValue(`Error: ${errorText}`);
      }

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("authorization", data.token);
      }

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("Can't login, please try again");
    }
  }
);

export const fetchRegister = createAsyncThunk(
  "user/register",
  async (
    user: { userName: string; password: string; isAdmin: boolean },
    thunkApi
  ) => {
    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        return thunkApi.rejectWithValue("Can't create, please try again");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("Can't create, please try again");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialData,
  reducers: {
    logOutUser: (state) =>
       {
      state.user = null;
       },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = DataStatus.LOADING;
      state.erorr = null;
      state.user = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = DataStatus.SUCCESS;
      state.erorr = null;
      state.user = action.payload as IUser;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = DataStatus.FAILED;
      state.erorr = action.error.message || "Failed to login";
      state.user = null;
    });
  },
});

export const {logOutUser} =userSlice.actions
export default userSlice;
