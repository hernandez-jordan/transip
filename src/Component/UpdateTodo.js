import React from "react";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton, InputBase, makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    maxWidth: 400,
    margin: "auto",
    background: "rgba(0, 0, 0, 0.4)",
    //borderRadius: 10,
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

const UpdateTodo = ({updateHandleChange, updateHandle, updateHandleClick, updateList}) => {
  const classes = useStyles();
  return (
    <form onSubmit={updateHandle} className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={`Update todo : ${updateList.value}`}
        onChange={updateHandleChange}
        //value={}
      />
      <IconButton
        //onClick={updateHandle(todo.value)}
        className={classes.iconButton}
      >
        <AddIcon />
      </IconButton>
      <IconButton
        onClick={updateHandleClick}
        className={classes.iconButton}
      >
        <CancelIcon />
      </IconButton>
    </form>
  );
};

export default UpdateTodo;