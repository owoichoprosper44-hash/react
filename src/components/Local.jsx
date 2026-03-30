
import React, { useState } from 'react'

const Local = () => {

    const App = () =>{
        const [todos, setTodos] = useState([]);
        const [input, setinput] = useState("");

    }

    
  return (
    <div>

        <input className='border-2' type="text" onChange={(e) => setinput(e.target.value)} />
        <h1>{input}</h1>
      
    </div>
  )
}

export default Local
