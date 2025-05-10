import type { Trade } from "~/types/Trade";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { addTrade, removeTrade, setTrades } from "~/features/trades/tradeSlice";

export const useTrade = () => {
  const dispatch = useAppDispatch();
  const trades = useAppSelector((state) => state.trade.trades);

  const addNewTrade = (trade: Trade) => dispatch(addTrade(trade));
  const removeTradeById = (id: number) => dispatch(removeTrade(id));
  const initializeTrades = (trades: Trade[]) => dispatch(setTrades(trades));

  return {
    trades,
    addNewTrade,
    removeTradeById,
    initializeTrades,
  };
};
