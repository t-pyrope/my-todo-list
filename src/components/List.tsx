import React, { useState } from "react";
import { IconButton, List as MuiList, Paper, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../app/store";

import TodoItem from "./TodoItem";
import AddTodoModal from "./AddTodoModal";

function List() {
  const [open, setOpen] = useState(false);
  const {
    todos: { todos, todoTypes },
  } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  return (
    <Paper elevation={0} className="todo-list">
      <Typography
        variant="h3"
        component="h1"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        Tasks
        <IconButton
          size="large"
          color="secondary"
          onClick={() => setOpen(true)}
        >
          <AddCircleIcon />
        </IconButton>
      </Typography>
      <MuiList>
        {todos.map((todo) => (
          <TodoItem key={todo.uniqueTitle} todo={todo} />
        ))}
      </MuiList>
      <AddTodoModal open={open} setOpen={setOpen} />
    </Paper>
  );
}

export default List;
