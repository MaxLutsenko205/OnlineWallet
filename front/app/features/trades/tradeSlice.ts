import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchAllTrade } from '~/services/api/TradeApi';
import { createTradeThunk, deleteTradeThunk, updateTradeThunk } from './tradeThunks';
import type { Trade } from '~/types/Trade';

enum TradeType {
  INCOME = 'Income',
  EXPENSE = 'Expense',
}

interface TradeState {
  trades: Trade[];
  filteredTrades: Trade[];
  loading: boolean;
  error: string | null;
  startDate: string;
  endDate: string;
}

const initialState: TradeState = {
  trades: [],
  filteredTrades: [],
  loading: false,
  error: null,
  startDate: '',  
  endDate: '',    
};

// Async thunk to fetch trades
export const fetchTradesThunk = createAsyncThunk(
  'trades/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await fetchAllTrade();
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить сделки');
    }
  }
);

// Filter trades based on the date range
const filterTrades = (state: TradeState) => {
  const { startDate, endDate, trades } = state;

  return trades.filter((trade) => {
    const tradeDate = new Date(trade.creationDate);
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();

    return tradeDate >= start && tradeDate <= end;
  });
};

const tradeSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
      state.filteredTrades = filterTrades(state);
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
      state.filteredTrades = filterTrades(state);
    },
    addTrade: (state, action: PayloadAction<Trade>) => {
      state.trades.push(action.payload);
      state.filteredTrades = filterTrades(state);
    },
    removeTrade: (state, action: PayloadAction<number>) => {
      state.trades = state.trades.filter((t) => t.id !== action.payload);
      state.filteredTrades = filterTrades(state);
    },
    updateTrade: (state, action: PayloadAction<Trade>) => {
      const index = state.trades.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.trades[index] = action.payload;
      }
      state.filteredTrades = filterTrades(state);
    },
    setTrades: (state, action: PayloadAction<Trade[]>) => {
      state.trades = action.payload;
      state.filteredTrades = filterTrades(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTradesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTradesThunk.fulfilled, (state, action) => {
        state.trades = action.payload;
        state.filteredTrades = filterTrades(state);
        state.loading = false;
      })
      .addCase(fetchTradesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке';
      })

      // CREATE
      .addCase(createTradeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTradeThunk.fulfilled, (state, action) => {
        state.trades.push(action.payload);
        state.filteredTrades = filterTrades(state);
        state.loading = false;
      })
      .addCase(createTradeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при создании';
      })

      // UPDATE
      .addCase(updateTradeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTradeThunk.fulfilled, (state, action) => {
        const index = state.trades.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.trades[index] = action.payload;
        }
        state.filteredTrades = filterTrades(state);
        state.loading = false;
      })
      .addCase(updateTradeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при обновлении';
      })

      // DELETE
      .addCase(deleteTradeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTradeThunk.fulfilled, (state, action) => {
        state.trades = state.trades.filter((t) => t.id !== action.payload);
        state.filteredTrades = filterTrades(state);
        state.loading = false;
      })
      .addCase(deleteTradeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при удалении';
      });
  },
});

export const { addTrade, removeTrade, updateTrade, setTrades, setStartDate, setEndDate } = tradeSlice.actions;

export default tradeSlice.reducer;
