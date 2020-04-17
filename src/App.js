import React, { useState, useEffect } from "react";
import "./App.css";
import SearchTodos from "./Component/SearchTodos";
import Todos from "./Component/Todos";
import AddTodos from "./Component/AddTodos";
import UpdateTodo from "./Component/UpdateTodo";
import Snackbar from '@material-ui/core/Snackbar';
import { Container, List, makeStyles } from "@material-ui/core";
import axios from "axios";



const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    margin: "auto",
    borderRadius: 10,
  }
}));

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [todo, setTodo] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [updateItem, setUpdateItem] = useState("");
  const [updateList, setUpdateList] = useState([]);
  const [newList, setNewList] = useState([]);
  const [todoItem, setTodoItem] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState('')
  let count = todoItem.length;
  const noItem = "No new to do's!";
  const apiUrl = "http://localhost:3001/todos";

  useEffect(() => {
    axios.get(apiUrl).then((res) => {
      const { todos } = res.data;
      setTodoItem(todos);
    });
  }, []);

  const searchHandleChange = (e) => {
    e.preventDefault();
    const search = e.target.value;
    setSearchItem(search.trim());
  };

  const searchHandle = (e, newList) => {
    e.preventDefault();
    //comparison arrays
    let currentList = [];
    let searchlist = [];
    // If the search bar isn't empty
    if (searchItem !== "") {
      currentList = todoItem;
      // Use .filter to determine which items should be displayed
      searchlist = currentList.filter((item) => {
        //regex matches any character other than newline
        const regex = /.+/;
        const filter = searchItem.toString().toLowerCase().match(regex);
        return item.value.toLowerCase().includes(filter);
      });
      setNewList(searchlist);
    } else setNewList(todoItem);
  };

  const todoHandleChange = (e) => {
    e.preventDefault();
    setTodo(e.target.value);
  };

  const todoHandle = (e) => {
    e.preventDefault();
    setSearchItem("");
    if (todo === "") return;

    axios
      .post(`${apiUrl}/add`, {
        title: todo,
      })
      .then((res) => {
        const { newTodo, message } = res.data;
        setTodoItem([...todoItem, newTodo]);
        setTodo("");
        setOpen(true);
        setMessage(message)
        
      })
      .catch((err) => {});
  };

  const deleteHandle = (id) => {
    setTodoItem(todoItem.filter((todo) => todo.id !== id));
    axios
      .delete(`${apiUrl}/delete/${id}`)
      .then((res) => {
        // snackbar message
        // const { todos } = res.data;
        // setTodoItem(todos);
      })
      .catch((err) => {});
  };

  const updateHandleClick = (todo) => {
    setIsUpdating(!isUpdating);
    setUpdateList(todo);
  };

  const updateHandleChange = (e) => {
    e.preventDefault();
    const update = e.target.value;
    setUpdateItem(update.trim());
  };

  const updateHandle = (id, title) => {
    setIsUpdating(!isUpdating);
    updateList.value = updateItem;
    axios
      .post(`${apiUrl}/update/${updateList.id}`, { title: updateItem })
      .then((res) => {
        //message snackbar
        // const { todos } = res.data;
      })
      .catch((err) => {});
  };

  const handleClose = (e) => {
    setOpen(false);
  };


  return (
    <Container className="App">
      <Snackbar 
        TransitionProps={{enter: false }} 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose} 
        message={message}
      />
      <h1>To do List</h1>
      <SearchTodos
        searchHandle={searchHandle}
        searchHandleChange={searchHandleChange}
        searchItem={searchItem}
      />
      {count ? <p>you have {count} item(s) </p> : null}
      <List className={classes.root}>
        {isUpdating ? (
          <UpdateTodo
            todo={todo}
            updateList={updateList}
            updateHandle={updateHandle}
            updateHandleClick={updateHandleClick}
            updateHandleChange={updateHandleChange}
            isUpdating={isUpdating}
          />
        ) : null}
        {todoItem.length > 0 ? (
          <Todos
            setTodo={setTodo}
            searchItem={searchItem}
            updateHandle={updateHandle}
            todoItem={todoItem}
            deleteHandle={deleteHandle}
            newList={newList}
            updateHandleClick={updateHandleClick}
          />
        ) : (
          noItem
        )}
      </List>
      <AddTodos
        todoHandleChange={todoHandleChange}
        todoHandle={todoHandle}
        todo={todo}
      />
    </Container>
  );
};

export default App;
