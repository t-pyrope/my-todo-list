import React from "react";
import { Box, Button, Modal, Paper, TextField } from "@mui/material";
import { Formik, FormikErrors } from "formik";

import { useAppDispatch } from "../app/store";
import { addSubTodo, updateTodo } from "../app/todos";

import { ITodo } from "../models/todo";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  py: 3,
  px: 4,
};

function AddSubTask({
  open,
  setOpen,
  todo,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo: ITodo;
}) {
  const dispatch = useAppDispatch();

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper elevation={0} sx={{ ...style }}>
        <Formik
          initialValues={{ title: "" }}
          validate={(values) => {
            const errors: FormikErrors<{ title: string }> = {};
            if (!values.title) {
              errors.title = "Required";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            dispatch(
              addSubTodo({
                uniqueTitle: todo.uniqueTitle,
                subTodo: values.title,
              })
            );
            setOpen(false);
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
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
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
              <Box>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                >
                  Add sub task
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      </Paper>
    </Modal>
  );
}

export default AddSubTask;
