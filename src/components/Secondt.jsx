import React, { useState } from "react"; 
const Secondt = ()=>{
    const[input, setInputValue] = useState("")
    const [inputArray, setInputArray] = useState([])
    function handlechange(e){
        setInputValue(e.target.value)   
    }
    function handleClick(){
        setInputArray([...inputArray, input])
    }
    return(
        <div>
            <input type="text" className="border-2" onChange={handlechange} />
            <button onClick={handleClick}>click</button>
            {
                inputArray.map((prosper, index) =>(
                    <div key={index}>{prosper}</div>
                ))
            }
        </div>
    )
}
export default Secondt