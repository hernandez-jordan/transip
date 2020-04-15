import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton, InputBase, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    maxWidth: 400,
    margin: "auto",
    background: "rgba(0, 0, 0, 0.4)",
    borderRadius: 10,
    marginBottom: theme.spacing(2),
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

const SearchTodos = ({ searchHandle, searchItem, searchHandleChange }) => {
  const classes = useStyles();
  return (
    <form onSubmit={searchHandle} className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search To do List"
        value={searchItem}
        onChange={searchHandleChange}
      />
      <IconButton onSubmit={searchHandle} className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchTodos;
