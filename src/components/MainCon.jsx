import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";

const MainCon = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    setTodos([...todos, { id:uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    setLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);

  };

  const handleEdit = (e , id) => {
    let t = todos.filter(i =>i.id === id)
    setTodo(t[0].todo);
    let newTodos = todos.filter(item=> {
      return item.id !== id;
    });
    setTodos(newTodos)
    setLS();
  };


  const setLS = (params) => { 
    localStorage.setItem("todos",JSON.stringify(todos))
   }

  const handleDelete = (e, id) => {
    console.log(`this is id ${id}`);
    let index = todos.findIndex(item=> {
      return item.id === id;
    });
    let newTodos = todos.filter(item=> {
      return item.id !== id;
    });
    setTodos(newTodos)
    setLS();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    // console.log(`this is id ${id}`); to check the working
    let index = todos.findIndex(item=> {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    setLS();
  };

  return (
    <div className=" bg-gradient-to-tr  min-w-[80vw] min-h-[90vh] box-border justify-start from-purple-600 to-sky-300 h-80 flex  items-center flex-col">
      {/* Add TODO container */}
      <div className="flex flex-col w-full items-center box-border overflow-hidden ">
        <div className="bg-slate-200 w-2/4 h-16 mb-5 text-center font-bold text-3xl m-4 p-3 rounded-xl ">
          <h2>Add Your TO-DO</h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-3  rounded-2xl  ">
          <input
            onChange={handleChange}
            value={todo}
            className="border-black w-[90vw] p-1 m-2 rounded-md"
            type="text"
            placeholder="Enter Your To-Do"
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-black hover:text-white mb-3 h-9 font-bold text-xl rounded-lg w-1/4 "
          >
            Submit
          </button>
        </div>
      </div>

      {/* Display TODO Container */}
      <h2 className=" text-center w-[30%] mb-2 bg-black text-2xl rounded-md font-bold text-white ">
            Your Todo
          </h2>
      <div className="bg-gradient-to-r from-blue-900 to-blue-400  min-w-[90%] rounded-xl p-4  w-10/12 h-4/6 min-h-[70%]  overflow-scroll">
        <div className="todo">
          {todos.length === 0 && <div className="text-white font-bold text-xl text-center">No Todos To Display...</div> }
          {todos.map(item=> {
            return (
              <>
                <div key={item.id} className=" todos box-border flex-wrap border-solid justify-between items-center flex text-white p-2">
                    <div className="flex gap-4 w-[70% ">
                    <input
                      type="checkbox"
                      onChange={handleCheckbox}
                      name={item.id}
                      value={item.isCompleted}
                      required
                    />
                    <div
                      className={
                        item.isCompleted
                          ? "text  text-white rounded-sm w-[80%] font-semibold ml-2 p-1 line-through text-xl"
                          : "text  text-white rounded-sm w-[80%] font-semibold  p-1 ml-2 text-xl"
                      }
                    >
                      {item.todo}
                    </div>
                    </div>
                  <div className="flex gap-1 ">
                    <button
                      onClick={(e) => {handleEdit(e,item.id)}}
                      className="bg-violet-600 hover:bg-violet-950 rounded-md p-1 m-1 text-white font-bold "
                    >
                      Edit{" "}
                    </button>
                    <button
                      onClick={(e)=>{handleDelete(e, item.id)}}
                      className="bg-violet-600 hover:bg-violet-950 rounded-md p-1 m-1 text-white font-bold "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainCon;
