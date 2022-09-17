import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, FormikErrors } from "formik";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";

import ColorPicker from "./ColorPicker";
import { ISubTodo, ITodo } from "../models/todo";
import { addTodo, updateTodo } from "../app/todos";

// Shape of form values
interface FormValues {
  title: string;
  uniqueTitle: string;
  description: string;
  color: string;
  type: null | string;
  subTodos: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  py: 3,
  px: 4,
};

function AddTodoModal({
  open,
  setOpen,
  todo,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo?: ITodo;
}) {
  const [anchorEl, setAnchorEl] = React.useState<
    HTMLInputElement | HTMLTextAreaElement | null
  >(null);
  const { todos, todoTypes } = useSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();

  const initialValues = todo
    ? {
        title: todo.title,
        uniqueTitle: todo.uniqueTitle,
        description: todo.description,
        color: todo.color,
        type: todo.type.attributes.title,
        subTodos: todo.subTodos.map((s) => s.title).join(", "),
      }
    : {
        title: "",
        uniqueTitle: "",
        description: "",
        color: "",
        type: "",
        subTodos: "",
      };

  const onColorFocus = (event: React.MouseEvent<HTMLDivElement>) => {
    // @ts-ignore
    setAnchorEl(event.currentTarget);
  };

  const onColorClose = () => {
    setAnchorEl(null);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="add-todo"
      aria-describedby="add-todo"
    >
      <Paper elevation={0} sx={{ ...style }}>
        <Typography variant="h3" component="h1" sx={{ marginBottom: "0.8rem" }}>
          Add task
        </Typography>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            let errors: FormikErrors<FormValues> = {};
            if (!values.title) {
              errors.title = "Required";
            }

            const isUnique = todos.find(
              (t) => t.uniqueTitle === values.uniqueTitle
            );
            if (!values.uniqueTitle) {
              errors.uniqueTitle = "Required";
            } else if (isUnique && !todo) {
              errors.uniqueTitle = "Such unique title already exists";
            }

            if (!values.description) {
              errors.description = "Required";
            }

            if (!values.color) {
              errors.color = "Required";
            }

            if (!values.type) {
              errors.type = "Required";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            const todoType = todoTypes.find(
              (t) => t.attributes.title === values.type
            );
            let subTodos: ISubTodo[] = [];

            if (values.subTodos) {
              subTodos = values.subTodos
                .split(",")
                .map((s: string) => s.trim())
                .map((s: string) => ({ title: s, done: false }));
            }

            if (todoType) {
              const todoToDispatch: ITodo = {
                title: values.title,
                author: "John Doe",
                uniqueTitle: values.uniqueTitle,
                description: values.description,
                color: values.color,
                type: todoType,
                subTodos,
                done: false,
              };

              if (todo) {
                dispatch(updateTodo(todoToDispatch));
              } else {
                dispatch(addTodo(todoToDispatch));
              }
              setSubmitting(false);
              setOpen(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                  width: "380px",
                }}
              >
                <Box>
                  <TextField
                    id="title"
                    error={touched.title && !!errors.title}
                    label="Title"
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    helperText={touched.title && errors.title}
                    fullWidth
                  />
                </Box>
                <Box>
                  <TextField
                    id="uniqueTitle"
                    error={touched.uniqueTitle && !!errors.uniqueTitle}
                    label="Unique title"
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.uniqueTitle}
                    helperText={touched.uniqueTitle && errors.uniqueTitle}
                    fullWidth
                  />
                </Box>
                {!todo && (
                  <Box>
                    <TextField
                      id="description"
                      error={touched.description && !!errors.description}
                      label="Description"
                      variant="filled"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      helperText={touched.description && errors.description}
                      fullWidth
                    />
                  </Box>
                )}
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="task-type">Task type</InputLabel>
                    <Select
                      labelId="task-type"
                      id="type"
                      name="type"
                      value={values.type}
                      label="Task type"
                      variant="filled"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {todoTypes.map((todoType) => (
                        <MenuItem
                          value={todoType.attributes.title}
                          key={todoType.id}
                        >
                          {todoType.attributes.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                {!todo && (
                  <Box>
                    <TextField
                      id="subTodos"
                      error={touched.subTodos && !!errors.subTodos}
                      label="Sub tasks (separate with commas)"
                      variant="filled"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subTodos}
                      helperText={touched.subTodos && errors.subTodos}
                      fullWidth
                    />
                  </Box>
                )}
                <Box>
                  <TextField
                    id="color"
                    error={touched.color && !!errors.color}
                    label="Color"
                    variant="filled"
                    onClick={onColorFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.color}
                    helperText={touched.color && errors.color}
                    fullWidth
                  />
                  <ColorPicker
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={onColorClose}
                    handleChange={handleChange}
                    value={values.color}
                  />
                </Box>
                <Box>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                  >
                    Add
                  </Button>
                </Box>
              </Box>
              <Box sx={{ width: "380px" }}>
                <Paper
                  elevation={0}
                  className="chosen-todo"
                  sx={{
                    background: values.color ? values.color : "#fff",
                    margin: "1rem",
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{ marginBottom: "0" }}
                  >
                    {values.title ? values.title : "Title"}
                  </Typography>
                  <Typography variant="body1">Author: John Doe</Typography>
                  <Typography variant="body1">
                    Description: {values.description}
                  </Typography>
                  <Typography variant="body1">Type: {values.type}</Typography>
                  <Typography variant="body1">
                    Sub tasks: {values.subTodos}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          )}
        </Formik>
      </Paper>
    </Modal>
  );
}

export default AddTodoModal;
