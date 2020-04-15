import React, { useState, useEffect } from "react";
import "./App.css";
import SearchTodos from "./Component/SearchTodos";
import Todos from "./Component/Todos";
import AddTodos from "./Component/AddTodos";
import { Container, List, makeStyles } from "@material-ui/core";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    margin: "auto",
    borderRadius: 10,
  },
}));

const App = () => {
  const classes = useStyles();
  const [todo, setTodo] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [newList, setNewList] = useState([]);
  const [todoItem, setTodoItem] = useState([]);
  let count = todoItem.length;
  const noItem = "No new to do's!";
  const apiUrl = 'http://localhost:3001/todos';
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
  // console.log("app = ", newList);
  const todoHandleChange = (e) => {
    e.preventDefault();
    setTodo(e.target.value);
  };

  const todoHandle = (e) => {
    e.preventDefault();
    if (todo === "") return;
    axios
    .post(`${apiUrl}/add`, {
      title: todo,
    })
    .then(res => {
      const { newTodo, message } = res.data;
      setTodoItem([...todoItem, newTodo]);
      setTodo("");
    })
    .catch(err => {});
  };

  const deleteHandle = (id) => {
    setTodoItem(todoItem.filter((todo) => todo.id !== id));
    axios.delete(`${apiUrl}/delete/${id}`,)
    .then(res => {
      // const { todos } = res.data;
      // setTodoItem(todos);
    })
    .catch(err => {});;
  };

  const updateHandle = (id, title) => {
    //@TODO 1. IF user clicks edit button
    //@TODO 2. Display input component with todo title value (must bed editable)
    //@TODO 3. display submit button in the input component
    //@TODO 4. when user clicks submit, send data with axios request 

    // setTodoItem(todoItem.filter((todo) => todo.id !== id));
    axios.post(`${apiUrl}/update/${id}`, {title})
    .then(res => {
      // const { todos } = res.data;
      // setTodoItem(todos);
    });
  };

  useEffect(() => {
    axios.get(apiUrl)
    .then(res => {
      const { todos } = res.data;
      setTodoItem(todos);
    });
  },[])

  return (
    <Container className="App">
      <h1>To do List</h1>
      <SearchTodos
        searchHandle={searchHandle}
        searchHandleChange={searchHandleChange}
        searchItem={searchItem}
      />
      {count ? <p>you have {count} item(s) </p> : null}
      <List className={classes.root}>
        {todoItem.length > 0 ? (
          <Todos
            updateHandle={updateHandle}
            todoItem={todoItem}
            deleteHandle={deleteHandle}
            newList={newList}
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

