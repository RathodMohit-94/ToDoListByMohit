import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const MainCon = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFinished, setShowFinished] = useState(true);

  // Load todos from localStorage on mount
  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos);
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        } else {
          console.warn("Invalid todos data in localStorage, resetting to empty array");
          setTodos([]);
        }
      }
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
      setTodos([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save todos to localStorage when todos change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("todos", JSON.stringify(todos));
      } catch (error) {
        console.error("Error saving todos to localStorage:", error);
      }
    }
  }, [todos, isLoading]);

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (e, id) => {
    const todoItem = todos.find((item) => item.id === id);
    if (todoItem) {
      setTodo(todoItem.todo);
      setTodos(todos.filter((item) => item.id !== id));
    }
  };

  const handleDelete = (e, id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleCheckbox = (e) => {
    const id = e.target.dataset.id;
    const index = todos.findIndex((item) => item.id === id);
    if (index !== -1) {
      const newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos);
    }
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <div className="bg-gradient-to-tr from-purple-600 to-sky-300 w-full min-h-screen flex flex-col items-center py-4 px-2 sm:px-4">
      {/* Add TODO container */}
      <div className="flex flex-col w-full max-w-2xl items-center">
        <div className="bg-slate-200 w-full sm:w-3/4 h-12 sm:h-16 text-center font-bold text-xl sm:text-3xl my-4 p-3 rounded-xl">
          <h2>Add Your TO-DO</h2>
        </div>
        <div className="flex flex-col items-center w-full gap-3">
          <input
            onChange={handleChange}
            value={todo}
            className="border-black w-full max-w-md p-2 m-1 rounded-md text-base"
            type="text"
            placeholder="Enter Your To-Do"
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-black hover:text-white h-9 font-bold text-base sm:text-xl rounded-lg w-1/3 sm:w-1/4 m-2"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Display TODO Container */}
      <div className="w-full max-w-2xl mt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-3 gap-2">
          <h2 className="text-center w-full sm:w-1/3 bg-black text-lg sm:text-2xl rounded-md font-bold text-white py-2">
            Your To-Do
          </h2>
          <button
            onClick={toggleFinished}
            className={`${
              showFinished
                ? "bg-violet-600 hover:bg-violet-950"
                : "bg-gray-500 hover:bg-gray-600"
            } text-white font-bold text-sm sm:text-base px-4 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-400`}
            aria-pressed={showFinished}
            aria-label={showFinished ? "Hide completed todos" : "Show completed todos"}
          >
            {showFinished ? "Hide Finished" : "Show Finished"}
          </button>
        </div>
        <div className="bg-gradient-to-r from-blue-800 to-blue-400 w-full rounded-xl p-3 sm:p-4 h-auto min-h-[50vh] overflow-y-auto no-scrollbar">
          <div className="todo">
            {isLoading ? (
              <div className="text-white font-bold text-lg text-center">
                Loading...
              </div>
            ) : todos.length === 0 ? (
              <div className="text-white font-bold text-lg text-center">
                No To-Dos To Display...
              </div>
            ) : (
              todos
                .filter((item) => showFinished || !item.isCompleted)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap justify-between items-center text-white p-2 border-b border-white/20"
                  >
                    <div className="flex gap-3 w-full sm:w-3/4 items-center">
                      <input
                        type="checkbox"
                        onChange={handleCheckbox}
                        data-id={item.id}
                        checked={item.isCompleted}
                        className="h-5 w-5"
                      />
                      <div
                        className={
                          item.isCompleted
                            ? "text-white font-semibold text-base sm:text-lg line-through overflow-x-auto no-scrollbar flex-1"
                            : "text-white font-semibold text-base sm:text-lg overflow-x-auto no-scrollbar flex-1"
                        }
                      >
                        {item.todo}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="bg-violet-600 hover:bg-violet-950 rounded-md px-3 py-1 text-white font-bold text-sm"
                        aria-label={`Edit todo: ${item.todo}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="bg-violet-600 hover:bg-violet-950 rounded-md px-3 py-1 text-white font-bold text-sm"
                        aria-label={`Delete todo: ${item.todo}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCon;