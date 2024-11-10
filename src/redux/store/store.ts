import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import candidateSlice from "../slices/candidateSlice";

const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        candidate:candidateSlice.reducer
    }
})
export default store