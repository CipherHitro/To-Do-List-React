const Todo = require("../model/todo");

async function handleGetAllTodos(req, res) {
  try {
    const todos = await Todo.find({});

    if (todos.length > 0) {
      return res.status(200).json({ todos });
    } else {
      return res.status(404).json({ message: "No todos found" });
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
async function handleAddTodo(req, res) {
  if (!req.body) {
    return res.status(500).json({ message: "Enter data first" });
  }
  const { title } = req.body;
  const todo = await Todo.create({
    title,
  });
  return res.status(201).json({ todo });
}
async function handleDeleteTodo(req, res) {
  const id = req.params.id;
  if (id) {
    const result = await Todo.deleteOne({ _id: id });
    return res.status(200).json({ message: "todo deleted", result });
  }
}
async function handleDeleteFinishedTodo(req, res) {
  const result = await Todo.deleteMany({ isCompleted: true });
  return res.status(200).json({ message: "Finished todos deleted", result });
}

async function handleDeleteAllTodo(req, res) {
  const result = await Todo.deleteMany({});
  return res.status(200).json({ message: "All todos deleted", result });
}

async function handleMarkCompleteTodo(req, res) {
  try {
    const id = req.params.id;

    let todo = await Todo.findById(id);
    console.log(todo);

    await Todo.findByIdAndUpdate(id, { isCompleted: !todo.isCompleted });
    console.log(todo);

    res.status(200).json({ message: "Todo marked completed successfully!!!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to upadate todo" });
  }
}

module.exports = {
  handleGetAllTodos,
  handleAddTodo,
  handleDeleteTodo,
  handleMarkCompleteTodo,
  handleDeleteFinishedTodo,
  handleDeleteAllTodo,
};
