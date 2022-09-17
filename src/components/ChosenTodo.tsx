import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Button, IconButton, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddTodoModal from "./AddTodoModal";
import AddSubTask from "./AddSubTask";

function ChosenTodo() {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [addSubtaskModalOpen, setAddSubtaskModalOpen] = useState(false);
  const { chosenTodo, chosenSubTodo } = useSelector(
    (state: RootState) => state.todos
  );

  if (!chosenTodo) return null;
  return (
    <Paper
      elevation={0}
      className="chosen-todo"
      sx={{ background: chosenTodo.color }}
    >
      {chosenSubTodo ? (
        <>
          <Typography variant="h3" component="h1" sx={{ marginBottom: "0" }}>
            {chosenSubTodo.title}
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h3" component="h1" sx={{ marginBottom: "0" }}>
            {chosenTodo.title}
            <IconButton
              size="small"
              sx={{ marginBottom: "2rem", marginLeft: "0.3rem" }}
              onClick={() => setUpdateModalOpen(true)}
            >
              <EditIcon />
            </IconButton>
          </Typography>
          <Typography variant="body1">Author: {chosenTodo.author}</Typography>
          <Typography variant="body1">
            Description: {chosenTodo.description}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setAddSubtaskModalOpen(true)}
            sx={{ marginTop: "1rem" }}
          >
            Add sub task
          </Button>
        </>
      )}
      <AddTodoModal
        open={updateModalOpen}
        setOpen={setUpdateModalOpen}
        todo={chosenTodo}
      />
      <AddSubTask
        open={addSubtaskModalOpen}
        setOpen={setAddSubtaskModalOpen}
        todo={chosenTodo}
      />
    </Paper>
  );
}

export default ChosenTodo;
