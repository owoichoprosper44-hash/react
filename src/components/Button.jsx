import React, { useState } from "react"; 
import { IoSettingsSharp } from "react-icons/io5";


const Button = (props) => {
    return(
        <button className="bg-red-500 p-5 text-white rounded-[5px]"
        style={{
            background: props.bg,
            color: props.textcolor

        }}
        
        
    
        onClick = {props.action}


        // className = {`${props.bg} ${props.padding} ${props.text} ${props.width} rounded-lg border-white `}
        >
            {props.ButtonText}
            
        </button>
    )
}

export default Button