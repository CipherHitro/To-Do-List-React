import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);
  async function fetchTodos() {
    try {
      const response = await fetch('http://localhost:5000/todo');
      const data = await response.json();

      console.log(data);

      if (data.todos) {
        setTodos(data.todos);
      }
      else {
        setTodos([])
      }

    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  }

  useEffect(() => {
    fetchTodos()
  }, []);


  const handleEdit = async (id) => {
    console.log(id);
    let t = todos.filter((i) => i._id === id);
    console.log("todos", t);
    setTodo(t[0].title);
    handleDelete(id)
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/todo/delete/${id}`, {
      method: "DELETE",
    })
    const res = await response.json()
    console.log(res)
    console.log(todos)
    fetchTodos()
  };

  const addTodo = async () => {
    const response = await fetch('http://localhost:5000/todo', {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ title: todo })
    })
    const data = await response.json()
    console.log(data)

    fetchTodos()

    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheck = async (e) => {
    let id = e.target.name;
    const response = await fetch(`http://localhost:5000/todo/${id}`, {
      method: "PATCH",
    })
    const res = await response.json()
    console.log("res:", res)
    fetchTodos()

  };

  const deleteFinishedTask = async () => {
    let newTodos = todos.filter((item) => {
      return item.isCompleted == false;
    });

    if (newTodos.length == todos.length) {
      alert("No finished task to delete");
      return;
    }
    if (confirm("Do you want to delete all the finished tasks??")) {
      const response = await fetch('http://localhost:5000/todo/finished', {
        method: 'DELETE'
      })
      const data = await response.json()
      console.log(data)
      fetchTodos()
    }
  };

  const deleteAllTask = async () => {
    if (todos.length == 0) {
      alert("No tasks to delete");
      return;
    }
    if (confirm("Do you want to delete all the tasks??")) {
      const response = await fetch('http://localhost:5000/todo/all', {
        method: 'DELETE'
      })
      const data = await response.json()
      console.log(data)
      fetchTodos()
    }
  };
  const TodoItem = ({ item, handleEdit, handleDelete, handleCheck }) => {
    return (
      <div
        key={item._id}
        className={
          item.isCompleted
            ? "todos my-2 opacity-50 flex gap-x-3 align-center"
            : "todos my-2 flex gap-x-3 align-center"
        }
      >
        <div className="check">
          <input
            id="default-checkbox"
            type="checkbox"
            checked={item.isCompleted}
            name={item._id}
            value={item.isCompleted}
            onChange={handleCheck}
            class="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1/4 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div
          className={
            !item.isCompleted ? "w-60 text-sm" : "w-60 text-sm line-through"
          }
        >
          {item.title}{" "}
        </div>
        <div className="buttons">
          <button
            type="button"
            className="cursor-pointer button border-1 py-1 px-2 rounded-md text-xs mx-2 bg-purple-700 text-white hover:bg-black"
            onClick={(e) => handleEdit(item._id)}
          >
            Edit
          </button>
          <button
            type="button"
            className="cursor-pointer button border-1 py-1 px-2 rounded-md text-xs mx-2 bg-purple-700 text-white hover:bg-black"
            onClick={(e) => handleDelete(item._id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="container overflow-hidden flex flex-col border-2 rounded-md m-auto my-9  min-h-[400px] max-h-[550px] w-[450px] bg-purple-100">
        <div className="title text-center m-4 font-bold">
          Manage your To-Do at one place
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent page reload
              addTodo(); // Call your existing function
            }}
          >
            <label
              htmlFor="small-input"
              className="block mb-2 mx-5 text-gray-900 dark:text-black font-bold"
            >
              Add To-Do
            </label>
            <input
              type="text"
              id="small-input"
              name="title"
              placeholder="Enter your task"
              value={todo}
              onChange={handleChange}
              className="w-80 mx-4 py-2 px-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-purple-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <input
              type="submit"
              value="Save"
              disabled={todo.length <= 2}
              className="cursor-pointer focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 mb-2 disabled:bg-slate-600 dark:bg-purple-600 dark:hover:bg-purple-900 dark:focus:ring-purple-900"
            />
          </form>
        </div>
        <div class="flex justify-between mx-5 my-3">
          <div>
            <input
              id="default-checkbox"
              type="checkbox"
              onClick={() => {
                setShowFinished(!showFinished);
              }}
              value={showFinished}
              class="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1/4 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-checkbox"
              class="ms-2 text-sm font-small dark:text-black"
            >
              Show Finished
            </label>
          </div>
          {showFinished ? (
            <div className="button">
              <button
                onClick={deleteFinishedTask}
                className="cursor-pointer focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-1 disabled:bg-slate-600 dark:bg-purple-600 dark:hover:bg-purple-900 dark:focus:ring-purple-900"
              >
                Delete Finished Tasks
              </button>
            </div>
          ) : (
            <div className="button">
              <button
                onClick={deleteAllTask}
                className="cursor-pointer focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-1 disabled:bg-slate-600 dark:bg-purple-600 dark:hover:bg-purple-900 dark:focus:ring-purple-900"
              >
                Delete All Tasks
              </button>
            </div>
          )}
        </div>

        <div className="title mx-3 font-medium">Your Tasks</div>
        <div className="content mx-4 flex-1 overflow-y-auto">

          {todos && todos.length > 0 ? (
            todos.map((item) => {
              if (!showFinished || (showFinished && item.isCompleted)) {
                return (
                  <TodoItem
                    key={item._id}
                    item={item}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleCheck={handleCheck}
                  />
                );
              }
              return null;
            })
          ) : (
            <h1 className="text-center my-10 font-semibold text-2xl text-red-600">No todos...</h1>
          )}

        </div>
      </div>
    </>
  );
}

export default App;
