import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { updateBudgetByTrade, setBudgetFromTrades } from "./userActions";
import type { User } from "~/types/User";
import type { Trade } from "~/types/Trade";
import { TradeType } from "~/types/TradeType";

const initialState: User = {
  isAuth: false,
  budget: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ token: string; budget: number }>) {
      const { token, budget } = action.payload;
      localStorage.setItem("token", token);
      return {
        ...state,
        isAuth: true,
        budget,
      };
    },
    logout(state) {
      localStorage.removeItem("token");
      return {
        isAuth: false,
        budget: 0,
        token: null,
      };
    },
    updateBudget(state, action: PayloadAction<number>) {
      state.budget = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBudgetByTrade, (state, action) => {
        const { trade, mode } = action.payload;
        const delta = trade.type === TradeType.INCOME ? trade.sum : -trade.sum;
        state.budget += mode === "add" ? delta : -delta;
      })
      .addCase(setBudgetFromTrades, (state, action) => {
        const trades = action.payload;
        const total = trades.reduce((acc, t) => {
          return acc + (t.type === TradeType.INCOME ? t.sum : -t.sum);
        }, 0);
        state.budget = total;
      });
  },
});

export const { setUser, logout, updateBudget } = userSlice.actions;
export default userSlice.reducer;
