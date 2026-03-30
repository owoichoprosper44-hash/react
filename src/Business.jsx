import React, { useEffect, useState } from "react";

const Business = ()=>{
    const[todos, setTodos] = useState([])
    const[input, setInput] = useState("")

    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todos))

    },[todos])

    useEffect(()=>{
        const savedTodos = localStorage.getItem("todos")
        if(savedTodos){
            setTodos(JSON.parse(savedTodos));
        }
    },[])

    // const handlechange = (e)=>{
    //     setInput(e.target.value)
    // }

    function handleclick(){
        setTodos([...todos, input])
    }
    return(
        <div>
            <input type="text" onChange={(e)=>setInput(e.target.value)} className="border-2" />
            
            <button onClick={handleclick}>click me</button>

            {todos.map((prosper, index) =>(
                <li key={index}>{prosper}</li>
            ))}
        </div>

    )
}
export default Business