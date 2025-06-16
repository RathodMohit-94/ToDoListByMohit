import React,{useState} from "react";

const MainCon = () => {

    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])


    const handleAdd = ()=>{
        setTodos=([...todos,{ todo, isCompleted:false}])

    }


    const handleEdit = ()=>{}
    
    
    const handleDelete = ()=>{}


        return (
    <div className=" bg-gradient-to-tr  min-w-[80vw] min-h-[80vh] justify-start from-purple-600 to-sky-300 h-80 flex  items-center flex-col">
      
      {/* Add TODO container */}
      <div className="flex flex-col w-full items-center box-border overflow-hidden ">
        <div className="bg-slate-200 w-2/4 h-16 mb-5 text-center font-bold text-3xl m-4 p-3 rounded-xl ">
          <h2>Add Your TO-DO</h2>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-3  rounded-2xl  "
        >
          <input
            className="border-black w-[90vw] p-1 m-2 rounded-md"
            type="text"
            placeholder="Enter Your To-Do"
          />
          <button onClick={handleAdd} className="bg-green-500 hover:bg-green-800 hover:text-white mb-3 h-9 font-bold text-xl rounded-lg w-1/4 ">
            Submit
          </button>
        </div>
      </div>
      
      
      {/* Display TODO Container */}
        <div className="bg-white min-w-[90%] rounded-md p-4  w-10/12 h-4/6 min-h-[70%] " >
            <div className="todo">
                <div className="todos">
                <p>{todo}</p>
            <div className="flex gap-1 ">
                <button onClick={handleEdit} className="bg-violet-600 hover:bg-violet-950 rounded-md p-1 m-1 text-white font-bold ">Edit </button>
                <button onClick={handleDelete} className="bg-violet-600 hover:bg-violet-950 rounded-md p-1 m-1 text-white font-bold ">Delete</button>
            </div>
            </div>
            </div>
        </div>


    </div>
  );
};

export default MainCon;
