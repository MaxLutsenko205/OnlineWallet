
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "~/types/User";

const initialState: User = {
  id: null,
  email: "",
  budget: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return { ...state, ...action.payload };
    },
    logout(state) {
      return { id: null, email: "", budget: 0 };
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
