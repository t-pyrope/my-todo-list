import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { setChosenSubTodo } from "../app/todos";

function Subtasks() {
  const { chosenTodo } = useSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();

  if (!chosenTodo) return null;
  return (
    <Paper
      elevation={0}
      className="chosen-todo"
      sx={{ background: chosenTodo.color }}
    >
      <Typography variant="h3" component="h1" sx={{ marginBottom: "0" }}>
        Subtasks
      </Typography>

      {chosenTodo.subTodos.length ? (
        <List>
          {chosenTodo.subTodos.map((s, i) => (
            <ListItem key={s.title + i}>
              <ListItemButton
                onClick={() => {
                  dispatch(setChosenSubTodo(s));
                }}
              >
                <Typography variant="body1">{s.title}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">
          `The task doesn't have subtasks`{" "}
        </Typography>
      )}
    </Paper>
  );
}

export default Subtasks;
