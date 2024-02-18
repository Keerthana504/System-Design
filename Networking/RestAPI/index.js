import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

// make any kind of request
app.all("/", (req, res) => {
  //   console.log("Request >", req);
  //   console.log("Response >", res);
  res.send("I'm up!");
});

const todos = [
  {
    id: 1,
    title: "Task 1",
    completed: false,
  },
  {
    id: 2,
    title: "Task 1",
    completed: true,
  },
  {
    id: 3,
    title: "Task 1",
    completed: false,
  },
];

//READ
app.get("/todos", (req, res) => {
  res.send(todos);
});

//CREATE
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json({ message: "New Todo Added" });
});

//UPDATE
app.put("/todos/:id", (req, res) => {
  const updateTodo = req.body;
  const todoParamId = Number(req.params.id);
  const todo = todos.findIndex((td) => td.id === todoParamId);
  if (todo !== -1) {
    todos[todo] = {
      id: todoParamId,
      ...updateTodo,
    };
  } else {
    res.status(400).json({ message: "Todo Id does not exist" });
  }
  res.json({ message: "Todo Updated successfully" });
});

//DELETE

app.delete("/todos/:id", (req, res) => {
  const todoParamId = Number(req.params.id);
  const todo = todos.findIndex((td) => td.id === todoParamId);
  if (todo !== -1) {
    todos.splice(todo, 1);
  }
  res.json({ message: "Todo Deleted" });
});

const PORT = 5111;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
