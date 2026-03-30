import React, { useEffect, useState } from "react";
import Button from "./Button";

const Rendering =()=>{ 
    
    const[isLoading, setIsLoading] = useState(true);
    const [showSecretMessage, setShowSecretMessage] = useState(false)
    useEffect (()=>{
    const timer = setTimeout( ()=>{
    setIsLoading(false);
    
    }, 5000 )
     return () => clearTimeout(timer);
    
    }

    
    )
    
    if(isLoading){
        return(
            <div className="w-screen h-screen  flex items-center justify-center gap-2 bg-black/50 text-white">
                 <div className=" w-10 h-10 border-3 rounded-full animate-spin  border-t-transparent"></div>Loading...



               
            </div>
        )
    }

    
    return(
        <div className="h-screen flex items-center flex-col gap-5">
            <h2 className="text-2xl font-bold text-red-700">Secret message</h2>
            <Button ButtonText = {showSecretMessage ? "hide" : "show"}
            action={()=>{setShowSecretMessage(!showSecretMessage )}}/>

            {/* <Button ButtonText = {showSecretMessage ? "hide": "show"} ></Button>

             */}

            {
              showSecretMessage && (
                <p>this is a short message</p>
              )
            }

        </div>
    )
}
export default Rendering