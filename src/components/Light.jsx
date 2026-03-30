import React, { useState } from "react";
import Button from "./Button";






const Light = ()=>{
    const [currentTheme, setCurrentTheme]= useState(true)
    
    return(
    <div className={`w-screen h-screen  ${currentTheme  ? 
        "bg-white text-black":  "bg-black text-white"} transition-all duration-500`}>
        <p className={`${currentTheme ? "text-black" : "text-white"}`}>This is a light mode</p>
        <button onClick={()=> setCurrentTheme(!currentTheme)}
            className= {`bg-red-700 p-5 rounded ${currentTheme ? "text-white": "text-black"} `}>{currentTheme ? "switch to dark": "switch to light"}</button>

            
    </div>
    )
}
export default Light