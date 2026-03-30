import React, { useState } from "react";

const Textchanger = ()=>{
    const [userInput, setUserInput] = useState("")
    return(
        <div className="w-screen h-screen bg-fuchsia-300 flex items-center justify-center flex-col gap-8" h>

            <input 
            type="text"
            className="bg-transparent w-[40%] indent-2 h-[45px] rounded border-2 border-white text-white  "
            placeholder="please type in your name" 
            onChange={(e)=> {
                console.log(e.target.value);
                setUserInput(e.target.value);
            }}/>
            <p> prosper:{userInput}</p>
        </div>
    )

}
export default Textchanger