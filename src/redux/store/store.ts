import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import candidateReducer from "../slices/candidateSlice";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
    candidate: candidateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
