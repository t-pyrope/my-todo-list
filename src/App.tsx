import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Alert, Grid } from "@mui/material";

import List from "./components/List";
import ChosenTodo from "./components/ChosenTodo";

import { addTodo, fetchTodoTypes } from "./app/todos";
import { RootState, useAppDispatch } from "./app/store";

import { ITodo } from "./models/todo";
import { COLORS } from "./constants/colors";
import Subtasks from "./components/Subtasks";
import { removeMessage } from "./app/alert";

function App() {
  const {
    todos: { todos, todoTypes },
    alert: { message },
  } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodoTypes());
  }, []);

  useEffect(() => {
    if (!message) return;
    const timeoutId = setTimeout(() => {
      dispatch(removeMessage());
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [message]);

  useEffect(() => {
    if (!todoTypes.length || todos.length) return;

    const saved = localStorage.getItem("todos");

    let tempTodos: ITodo[] = [];
    if (saved) {
      tempTodos = JSON.parse(saved);
    } else {
      tempTodos = [
        {
          title: "Do statistics",
          uniqueTitle: "do-statistics",
          author: "John Doe",
          description: "Do statistics, because it's necessary to do",
          color: COLORS[0].color,
          type: todoTypes[0],
          done: false,
          subTodos: [{ title: "Do main statistics", done: false }],
        },
        {
          title: "Send emails to the investors",
          uniqueTitle: "send-email-to-the-investors",
          author: "Mary Hoe",
          description: "Send emails about the thing we talked today ",
          color: COLORS[5].color,
          type: todoTypes[1],
          done: false,
          subTodos: [],
        },
        {
          title: "Organize meetings for new opening of the product",
          uniqueTitle: "organize-meetings",
          author: "John Doe",
          description:
            "It's necessary to present our new product very accurately",
          color: COLORS[4].color,
          type: todoTypes[2],
          done: false,
          subTodos: [
            { title: "Find a space", done: false },
            { title: "Organize food", done: false },
            { title: "Organize baloons", done: false },
            { title: "Make invitation cards", done: false },
            { title: "Make sure the presentation is ready", done: false },
          ],
        },
        {
          title: "Change background color of our website",
          uniqueTitle: "change background",
          author: "Mary Hoe",
          description:
            "Change background color of our website to more calm one, because the actual is too bright",
          color: COLORS[12].color,
          type: todoTypes[1],
          done: false,
          subTodos: [],
        },
        {
          title: "Find a designer",
          uniqueTitle: "find a designer",
          author: "Mary Hoe",
          description:
            "Our disagner is going to move to Argentina, so we need to find a new one urgently",
          color: COLORS[12].color,
          type: todoTypes[1],
          done: false,
          subTodos: [{ title: "Post ad", done: false }],
        },
      ];
    }
    for (const todo of tempTodos) {
      dispatch(addTodo(todo));
    }
  }, [todoTypes, todos]);

  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <List />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <ChosenTodo />
            </Grid>
            <Grid item xs={12}>
              <Subtasks />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {Boolean(message) && (
        <Alert severity="success" className="alert">
          {message}
        </Alert>
      )}
    </div>
  );
}

export default App;
