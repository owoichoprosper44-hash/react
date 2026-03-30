import React from "react";
import Button from "./Button"

const Samuel = (props)=>{
    return(
      <div>
        <img src={props.image} alt="" />
        <h2>{props.name}</h2>
        <h4>{props.about}</h4>
        <Button ButtonText = "click me"
        
        />


      </div>
    )
}
export default Samuel