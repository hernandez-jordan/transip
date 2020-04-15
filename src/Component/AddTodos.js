import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { IconButton, InputBase, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    maxWidth: 400,
    margin: "auto",
    background: "rgba(0, 0, 0, 0.4)",
    borderRadius: 10,
    marginTop: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: "white",
  },
  iconButton: {
    padding: 10,
    color: "rgba(255, 255, 255, 0.5)",
    marginRight: theme.spacing(2),
  },
}));

const AddTodos = ({ todoHandleChange, todoHandle, todo }) => {
  const classes = useStyles();
  return (
    <form onSubmit={todoHandle} className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Add a new To do"
        onChange={todoHandleChange}
        value={todo}
      />
      <IconButton
        onSubmit={todoHandle}
        className={classes.iconButton}
      >
        <AddIcon />
      </IconButton>
    </form>
  );
};

export default AddTodos;
