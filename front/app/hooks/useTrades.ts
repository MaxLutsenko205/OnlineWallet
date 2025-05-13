import {
  createTradeThunk,
  deleteTradeThunk,
  fetchTradesThunk,
  updateTradeThunk,
} from "~/features/trades/tradeThunks";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import type { createTradeDto } from "~/services/api/TradeApi";

export const useTrade = () => {
  const dispatch = useAppDispatch();
  const { trades,filteredTrades, loading, error } = useAppSelector((state) => state.trade);

  const fetchAllTrades = () => dispatch(fetchTradesThunk());
  const createTrade = (trade: createTradeDto) => dispatch(createTradeThunk(trade));
  const updateTrade = (id: number, trade: Partial<createTradeDto>) =>
    dispatch(updateTradeThunk({ id, body: trade }));
  const deleteTrade = (id: number) => dispatch(deleteTradeThunk(id));

  return {
    trades,
    filteredTrades,
    loading,
    error,
    fetchAllTrades,
    createTrade,
    updateTrade,
    deleteTrade,
  };
};

