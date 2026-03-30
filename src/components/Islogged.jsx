import React, { useState } from "react";
import Button from "./Button";


const Islogged = ()=>{

    const[logged, setlogged]= useState(false);
    return(
        <div className="flex flex-col justify-center items-center">
            <Button ButtonText = {logged ? "log out" : "log in"}
            action = {()=> setlogged(logged? false : true)}
            />
             {logged ?  "welcome you have log" : "please log in" }
        </div>

       
    )
}


export default Islogged