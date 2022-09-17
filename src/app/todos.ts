import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISubTodo, ITodo, ITodoType } from "../models/todo";
import { getTodoTypes } from "../api";

export interface TodosState {
  todos: ITodo[];
  chosenTodo: ITodo | null;
  chosenSubTodo: ISubTodo | null;
  todoTypes: ITodoType[];
  loadingTodoTypes: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: TodosState = {
  todos: [],
  chosenTodo: null,
  chosenSubTodo: null,
  todoTypes: [],
  loadingTodoTypes: "idle",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.todos.push(action.payload);

      localStorage.clear();
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const uniqueTitle = action.payload;
      state.todos = state.todos.filter(
        (todo) => todo.uniqueTitle !== uniqueTitle
      );

      localStorage.clear();
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const uniqueTitle = action.payload.uniqueTitle;
      state.todos = state.todos.map((todo) => {
        if (todo.uniqueTitle === uniqueTitle) {
          return action.payload;
        } else {
          return todo;
        }
      });
      if (state.chosenTodo && state.chosenTodo.uniqueTitle === uniqueTitle) {
        state.chosenTodo = action.payload;
      }

      localStorage.clear();
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    setChosenTodo: (state, action: PayloadAction<string>) => {
      const chosenTodo = state.todos.find(
        (todo) => todo.uniqueTitle === action.payload
      );
      if (chosenTodo) {
        state.chosenSubTodo = null;
        state.chosenTodo = chosenTodo;
      }
    },
    setChosenSubTodo: (state, action: PayloadAction<ISubTodo>) => {
      state.chosenSubTodo = action.payload;
    },
    addSubTodo: (
      state,
      action: PayloadAction<{ uniqueTitle: string; subTodo: string }>
    ) => {
      const todo = state.todos.find(
        (t) => t.uniqueTitle === action.payload.uniqueTitle
      );
      if (todo) {
        todo.subTodos.push({ title: action.payload.subTodo, done: false });
        state.todos = state.todos.map((t) => {
          if (t.uniqueTitle === action.payload.uniqueTitle) {
            return todo;
          } else {
            return t;
          }
        });

        state.chosenTodo = todo;

        localStorage.clear();
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchTodoTypes.fulfilled, (state, action) => {
      // Add user to the state array
      state.todoTypes = action.payload;
    });
  },
});

export const fetchTodoTypes = createAsyncThunk(
  "todoTypes/fetchTodoTypes",
  async () => {
    return await getTodoTypes();
  }
);

// Action creators are generated for each case reducer function
export const {
  addTodo,
  removeTodo,
  updateTodo,
  setChosenTodo,
  setChosenSubTodo,
  addSubTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
