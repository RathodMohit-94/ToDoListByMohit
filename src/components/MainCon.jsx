import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const MainCon = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const [showFinished, SetshowFinished] = useState(true);
  const toggleFinshed = (param) => {
  
  };

  // Load todos from localStorage on mount
  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos);
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        } else {
          console.warn(
            "Invalid todos data in localStorage, resetting to empty array"
          );
          setTodos([]);
        }
      }
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
      setTodos([]); // Fallback to empty array on error
    } finally {
      setIsLoading(false); // Mark loading as complete
    }
  }, []);

  // Save todos to localStorage when todos change
  useEffect(() => {
    if (!isLoading) {
      // Only save after initial load
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

  return (
    <div className="bg-gradient-to-tr min-w-[80vw] min-h-[90vh] box-border justify-start from-purple-600 to-sky-300 h-80 flex items-center flex-col">
      {/* Add TODO container */}
      <div className="flex flex-col w-full items-center box-border overflow-hidden">
        <div className="bg-slate-200 w-2/4 h-16 mb-5 text-center font-bold text-3xl m-4 p-3 rounded-xl">
          <h2>Add Your TO-DO</h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl">
          <input
            onChange={handleChange}
            value={todo}
            className="border-black w-[90vw] p-1 m-2 rounded-md"
            type="text"
            placeholder="Enter Your To-Do"
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-black hover:text-white mb-3 h-9 font-bold text-xl rounded-lg w-1/4"
          >
            Submit
          </button>
          
        </div>
      </div>

      {/* Display TODO Container */}
      <h2 className="text-center w-[30%] mb-2 bg-black text-2xl rounded-md font-bold text-white">
        Your To-Do
      </h2>
      <div className="bg-gradient-to-r no-scrollbar from-blue-800 to-blue-400 min-w-[90%] rounded-xl p-4 w-10/12 h-4/6 min-h-[70%] overflow-y-auto">
        <div className="todo">
          {isLoading ? (
            <div className="text-white font-bold text-xl text-center">
              Loading...
            </div>
          ) : todos.length === 0 ? (
            <div className="text-white font-bold text-xl text-center">
              No TODO To Display...
            </div>
          ) : (
            todos.map((item) => (
              <div
                key={item.id}
                className="todos box-border flex-wrap border-solid justify-between items-center flex text-white p-2"
              >
                <div className="flex gap-4 w-[70%]">
                  <input
                    type="checkbox"
                    onChange={handleCheckbox}
                    data-id={item.id}
                    checked={item.isCompleted}
                  />
                  <div
                    className={
                      item.isCompleted
                        ? "text-white h-auto overflow-x-scroll no-scrollbar font-semibold text-xl line-through"
                        : "text-white h-auto overflow-x-scroll no-scrollbar font-semibold text-xl"
                    }
                  >
                    {item.todo}
                  </div>
                </div>
                <div className="flex gap-1 h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-violet-600 hover:bg-violet-950 rounded-md p-1 m-1 text-white font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-violet-600 hover:bg-violet-950 rounded-md p-1 m-1 text-white font-bold"
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
  );
};

export default MainCon;
