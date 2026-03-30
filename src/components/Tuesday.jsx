import React, { useState } from "react"

const Tuesday = ()=>{
    const [input, setInput] = useState("")
    const [task, setTask] = useState([])

    const handleClick = () =>{

        if(input.trim() ==="") return
        const newTask = [...task, {text:input, status:"pending"}]
        setTask(newTask);
        console.log("task now:", newTask)
        console.log("Task now:", newTask)
        setInput("")
    }
    const handleChange =(index, newStatus) =>{
        const updated = [...task];
        updated[index] = {...updated[index], status : newStatus}
        setTask(updated);
        console.log("updated task :", updated);
    }

    return(
        <div className="p-5 max-w-[600px] ">
            <h2>Todo list</h2>
            <input type="text" 
            placeholder="type your task"
            value={input}

            onChange={(e)=>setInput(e.target.value)}
            className="p-5 border-2"/>

            <button onClick={handleClick} className="bg-black text-white p-5">add button</button>
            
            <p>your typed text: {input}</p>

            <h3>Task</h3>
            <ul>
                {
                    task.map((t, i)=>(
                        <li key={i}>
                            {t.text} - {t.status}
                        </li>
                    ))
                }
            </ul>
        </div>
    )

}
export default Tuesday