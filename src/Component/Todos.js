import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  IconButton,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    minWidth: 0,
    color: "white",
  },
  color: {
    color: "white"
  }
}));

const Todos = (props) => {
  const {
    todoItem,
    deleteHandle,
    newList,
    updateHandle,
    updateHandleClick,
    searchItem
  } = props;
  const classes = useStyles();

  const searchList = newList.map((todo, key) => {
    return (
      <ListItem button key={key}>
        <ListItemText primary={todo.value} />
          <IconButton
            aria-label="edit"
            onClick={(e) => updateHandle(todo.id, todo.value)}
          >
            <CreateIcon className={classes.icon} />
          </IconButton>
          <IconButton aria-label="delete" onClick={(e) => deleteHandle(todo.id)}>
            <DeleteIcon className={classes.icon} />
          </IconButton>
      </ListItem>
    );
  });

  const todoList = todoItem.map((todo, key, id) => {
    return (
      <ListItem button key={key}>
        <ListItemText primary={todo.value} />
        <IconButton
          aria-label="edit"
          onClick={(e) => updateHandleClick(todo)}
        >
          <CreateIcon className={classes.icon} />
        </IconButton>
        <IconButton 
          aria-label="delete" 
          onClick={(e) => deleteHandle(todo.id)}
          >
          <DeleteIcon className={classes.icon} />
        </IconButton>
      </ListItem>
    ) 
  });


  return <>{searchItem.length > 0 ? searchList : todoList}</>;
};

export default Todos;
