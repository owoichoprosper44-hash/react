import React, { useState } from "react";

const Strike = ()=>{
    const[text, setText]= useState("")
    const [status, setStatus] = useState("not-completed");
    const [items, setItems] = useState([])
     const handleAdd = ()=>{
        const newItem = {
            name :text,
            completed : status === "completed"
        };
        setItems([...items, newItem])
        setText("")
     };
    return(
        <div className="p-[20px]">
            <h1>Task app</h1>
            <input className="border-2" type="text"
            onChange={(e)=>setStatus(e.target.value)} />
        </div>

    )
}
export default Strike