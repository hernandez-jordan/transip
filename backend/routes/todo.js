const router = require("express").Router();
let Todo = require("../models/todo.model");

//if there are items in the database, retrieve them
router.route("/").get((req, res) => {
  Todo.find()
    .then((todo) => {
      const mappedTodos = todo.map((todo) => {
        return { id: todo._id, value: todo.title };
      });
      return res.json({ todos: mappedTodos });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//add a todo to the database
router.route("/add").post((req, res) => {
  const title = req.body.title;
  const newTodo = new Todo({
    title,
  });

  newTodo
    .save()
    .then(() => {
      res.json({
        message: "todo added!",
        newTodo: { id: newTodo._id, value: newTodo.title },
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete a todo by id
router.route("/delete/:id").delete((req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id)
    .then(() => res.json("Todo deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update a todo by id
router.route("/update/:id").post((req, res) => {
  Todo.findById(req.params.id)
    .then((todo) => {
      todo.title = req.body.title;

      todo
        .save()
        .then(() => res.json("Todo updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
