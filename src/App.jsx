import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";

import { v4 as uuidv4 } from "uuid";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEdit = (e, id) => {
    console.log(id);
    let t = todos.filter((i) => i.id === id);
    console.log(t);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const addTodo = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const deleteFinishedTask = () => {
    let newTodos = todos.filter((item) => {
      return item.isCompleted == true;
    });

    if (newTodos.length == 0) {
      alert("No finished task to delete");
      return;
    }
    if (confirm("Do you want to delete all the finished tasks??")) {
      setTodos(newTodos);
    }
  };
  
  const deleteAllTask = () => {
    if (todos.length == 0) {
      alert("No tasks to delete");
      return;
    }
    if (confirm("Do you want to delete all the tasks??")) {
      setTodos([]);
    }
  };
  const TodoItem = ({ item, handleEdit, handleDelete, handleCheck }) => {
    return (
      <div
        key={item.id}
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
            name={item.id}
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
          {item.todo}{" "}
        </div>
        <div className="buttons">
          <button
            type="button"
            className="button border-1 py-1 px-2 rounded-md text-xs mx-2 bg-purple-700 text-white hover:bg-black"
            onClick={(e) => handleEdit(e, item.id)}
          >
            Edit
          </button>
          <button
            type="button"
            className="button border-1 py-1 px-2 rounded-md text-xs mx-2 bg-purple-700 text-white hover:bg-black"
            onClick={(e) => handleDelete(e, item.id)}
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
            <button
              type="submit" // Important for Enter key support
              disabled={todo.length <= 2}
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 mb-2 disabled:bg-slate-600 dark:bg-purple-600 dark:hover:bg-purple-900 dark:focus:ring-purple-900"
            >
              Save
            </button>
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
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-1 disabled:bg-slate-600 dark:bg-purple-600 dark:hover:bg-purple-900 dark:focus:ring-purple-900"
              >
                Delete Finished Tasks
              </button>
            </div>
          ) : (
            <div className="button">
              <button
                onClick={deleteAllTask}
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-1 disabled:bg-slate-600 dark:bg-purple-600 dark:hover:bg-purple-900 dark:focus:ring-purple-900"
              >
                Delete All Tasks
              </button>
            </div>
          )}
        </div>

        <div className="title mx-3 font-medium">Your Tasks</div>
        <div className="content mx-4 flex-1 overflow-y-auto">
          {todos.map((item) => {
            if (!showFinished) {
              return (
                <TodoItem
                  key={item.id}
                  item={item}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleCheck={handleCheck}
                />
              );
            } else if (showFinished && item.isCompleted) {
              return (
                <TodoItem
                  key={item.id}
                  item={item}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleCheck={handleCheck}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
}

export default App;
