import React, { useState } from 'react'

const Todoextra = () => {
    // Initial state for array should be an empty array
    const [input, setInput] = useState("");
    const [write, setWrite] = useState("");
    const [array, setArray] = useState([]); // Renamed setEmptyArray to setArray for clarity

    const handleClick = () => {
        // Basic validation: only add if input has content
        if (input.trim() !== "") {
            // Correct way to update array state:
            // Create a NEW array with all existing items + the new item
            setArray(prevArray => [...prevArray, { input, write }]);
            
            // Clear inputs after adding
          
            // You might want to reset the selection too, or just leave it.
            // setWrite("completed"); 
        }
    }

    return (
        <div>
            <div>
                <input 
                    type="text" 
                    className='border-2 rounded-2xl p-5' 
                    placeholder='write your task' 
                    value={input} // Add value prop for controlled input
                    onChange={(e) => setInput(e.target.value)}
                />
                <select name="" id="" onChange={(e) => setWrite(e.target.value)}>
                    <option value="completed">completed</option>
                    <option value="pending">pending</option>
                    <option value="cancel">cancel</option>
                </select>
                <button onClick={handleClick}>click</button>

                {
                    // This is where you use .map(). The fix ensures 'array' is an array.
                    array.map((item, index) => (
                        <div key={index} className='w-[400px]'>

                            <div className={`w-5 h-5 border-2 rounded-full ${item.write === "pending" ? "bg-green-400":item.write === "cancel" ? "bg-black":item.write === "completed"? "bg-yellow-500":null}`}></div>

                            
                            Task: {item.input} | Status: {item.write}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Todoextra