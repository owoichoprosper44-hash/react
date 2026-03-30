import React, { useState } from "react";
import Button from "./Button";





const Buttonboy = ()=>{

    const increase = ()=>{
        setCount(prev => prev + 1)
    }
    const decrease = ()=>{
        setCount(prev => prev - 1)
    }

    const [count, setCount]= useState(0)
    return(
        <div className="flex gap-5 justify-center p-[40px]">
      <Button  ButtonText="increase"
      action = {()=> increase()}
      />
      <p>{count} </p>
      <Button ButtonText="decrease"
      action = {() => decrease()}
      />
      </div>

    )
}

export default Buttonboy