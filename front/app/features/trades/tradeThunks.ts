import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTrade,
  deleteTradeById,
  fetchAllTrade,
  getOneTrade,
  updateTrade,
  type createTradeDto,
} from "~/services/api/TradeApi";
import { setBudgetFromTrades, updateBudgetByTrade } from "../user/userActions";

export const fetchTradesThunk = createAsyncThunk(
  "trades/fetchAll",
  async (_, thunkAPI) => {
    try {
      const trades = await fetchAllTrade();
      thunkAPI.dispatch(setBudgetFromTrades(trades));
      return trades;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось загрузить сделки");
    }
  }
);

export const getTradeThunk = createAsyncThunk(
  "trades/getOne",
  async (id: number, thunkAPI) => {
    try {
      return await getOneTrade(id);
    } catch (e) {
      return thunkAPI.rejectWithValue(`Сделка с id=${id} не найдена`);
    }
  }
);

export const createTradeThunk = createAsyncThunk(
  "trades/create",
  async (body: createTradeDto, thunkAPI) => {
    try {
      const trade = await createTrade(body);
      thunkAPI.dispatch(updateBudgetByTrade({ trade, mode: "add" }));
      return trade;
    } catch (e) {
      return thunkAPI.rejectWithValue("Ошибка при создании сделки");
    }
  }
);

export const updateTradeThunk = createAsyncThunk(
  "trades/update",
  async (
    { id, body }: { id: number; body: Partial<createTradeDto> },
    thunkAPI
  ) => {
    try {
      return await updateTrade(id, body);
    } catch (e) {
      return thunkAPI.rejectWithValue("Ошибка при обновлении сделки");
    }
  }
);

export const deleteTradeThunk = createAsyncThunk(
  "trades/delete",
  async (id: number, thunkAPI) => {
    try {
      const trade = await getOneTrade(id); // получаем данные перед удалением
      await deleteTradeById(id);
      thunkAPI.dispatch(updateBudgetByTrade({ trade, mode: "subtract" }));
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(`Ошибка при удалении сделки с id=${id}`);
    }
  }
);
