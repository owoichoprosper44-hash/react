import React, { useState } from "react";
 const Todo = ()=>{
    const[task, setTask] = useState([]);
    const [newTask, setNewTask] = useState("")
    function handleInputChange(event){
        setTaskNewTask(event.target.value)

    }
    function addTask(){
        

    }
    function deleteTask(index){

    }
    function moveTaskUp(index){

    }
    return(
        
        <div className="todolist">

            <h1>To do list</h1>
            <div>
                <input type="text " 
                value={newTask}
                className="border text-black" 
                onChange={handleInputChange}/>
            </div>

        </div>
    )
 }

 export default Todo