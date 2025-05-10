import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Trade } from "~/types/Trade";

interface TradeState {
  trades: Trade[];
}

const initialState: TradeState = {
  trades: [],
};

const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    setTrades(state, action: PayloadAction<Trade[]>) {
      state.trades = action.payload;
    },
    addTrade(state, action: PayloadAction<Trade>) {
      state.trades.push(action.payload);
    },
    removeTrade(state, action: PayloadAction<number>) {
      state.trades = state.trades.filter(
        (trade) => trade.id !== action.payload
      );
    },
  },
});

export const { setTrades, addTrade, removeTrade } = tradeSlice.actions;
export default tradeSlice.reducer;
