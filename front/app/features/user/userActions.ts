import { createAction } from "@reduxjs/toolkit";
import type { Trade } from "~/types/Trade";

export const updateBudgetByTrade = createAction<{
  trade: Trade;
  mode: "add" | "subtract";
}>("user/updateBudgetByTrade");

export const setBudgetFromTrades = createAction<Trade[]>(
  "user/setBudgetFromTrades"
);