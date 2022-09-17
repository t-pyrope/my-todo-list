import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISubTodo, ITodo, ITodoType } from "../models/todo";
import { getTodoTypes } from "../api";

export interface AlertState {
  message: string;
}

const initialState: AlertState = {
  message: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.message = action.payload;
    },
    removeMessage: (state) => {
      state.message = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMessage, removeMessage } = alertSlice.actions;

export default alertSlice.reducer;
