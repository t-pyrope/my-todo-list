import React, { useState } from "react";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { removeTodo, setChosenTodo } from "../app/todos";
import { useAppDispatch } from "../app/store";
import { addMessage } from "../app/alert";

import { ITodo } from "../models/todo";

function TodoItem({ todo }: { todo: ITodo }) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onTodoClick = () => {
    dispatch(setChosenTodo(todo.uniqueTitle));
  };

  const deleteTodo = () => {
    dispatch(removeTodo(todo.uniqueTitle));
  };

  const copyTodo = () => {
    navigator.clipboard.writeText(todo.title);
    dispatch(addMessage("Copied to clipboard"));
    setAnchorEl(null);
  };

  const subtitleCount = todo.subTodos.length;
  const open = Boolean(anchorEl);

  return (
    <ListItem
      key={todo.uniqueTitle}
      sx={{ background: todo.color, marginBottom: "0.5rem" }}
      aria-describedby={todo.uniqueTitle}
      secondaryAction={
        <>
          <IconButton
            edge="end"
            aria-label="open context menu"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Popover
            id={todo.uniqueTitle}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <List sx={{ width: "130px" }}>
              <ListItem disablePadding>
                <ListItemButton onClick={deleteTodo}>
                  <ListItemText primary="Delete" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={copyTodo}>
                  <ListItemText primary="Copy" />
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
        </>
      }
    >
      <ListItemButton onClick={onTodoClick}>
        <ListItemText
          primary={todo.title}
          secondary={`${todo.type.attributes.title}, ${subtitleCount} ${
            subtitleCount === 1 ? "sub task" : "sub tasks"
          }`}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default TodoItem;
