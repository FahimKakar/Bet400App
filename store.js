import {configureStore} from "@reduxjs/toolkit";
import betReducer from './betSlice'

export const store = configureStore({
  reducer: {
    bet: betReducer,
  },
});
export default store;