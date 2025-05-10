
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import tradeReducer from './trades/tradeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    trade: tradeReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;