import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { DataStatus, UserState } from "../../types/redux";
import { IUser } from "../../types/users";
import { initialData } from "../initialData/initialUser";

const initialState: UserState = {
  erorr: null,
  status: DataStatus.IDLE,
  user: null,
};

export const fetchLogin = createAsyncThunk(
  "user/login",
  async (user: { userName: string; password: string }, thunkApi) => {
    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return thunkApi.rejectWithValue(`Error: ${errorText}`);
      }

      const data = await res.json();
      if (data.token) localStorage.setItem("authorization", data.token);
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
        const errorText = await res.text();
        return thunkApi.rejectWithValue(`Error: ${errorText}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("Can't register, please try again");
    }
  }
);

export const fetchProfileUpdate = createAsyncThunk(
  "user/profile",
  async (id: string, thunkApi) => {
    try {
      const token = localStorage.getItem("authorization");

      const res = await fetch("http://localhost:3000/api/users/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return thunkApi.rejectWithValue(`Error: ${errorText}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("Can't update profile, please try again");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = null;
      localStorage.removeItem("authorization");
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.erorr = null;
        state.user = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.erorr = null;
        state.user = action.payload as IUser;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.erorr = action.payload as string;
        state.user = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.erorr = null;
      })
      .addCase(fetchRegister.fulfilled, (state) => {
        state.status = DataStatus.SUCCESS;
        state.erorr = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.erorr = action.payload as string;
      })
      .addCase(fetchProfileUpdate.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload } as IUser;
        }
      })
      .addCase(fetchProfileUpdate.rejected, (state, action) => {
        state.erorr = action.payload as string;
      });
  },
});

export const { logOutUser } = userSlice.actions;
export default userSlice.reducer;
