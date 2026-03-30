import React, { useState } from "react";
import Button from "./Button";


const Facebook = ()=>{
    const[userInput, setUserInput]= useState("");
    const[userInputA, setUserInputB] = useState("");

    

    

    // const handleInputChange = (e)=>{
    //     setUserInput(e.target.value)
    //     console.log(e.target.value)
        



    // }
    const Anotherinp = (e)=>{
        
        setUserInputB(e.target.value);
    }



    return(

        <React.Fragment>
        <div>


        
        <div className="w-[500px] h-[700px] m-3  p-[10px] bg-[white] flex  flex-col gap-2 border-8 rounded-3xl border-black items-center justify-center"

        >

     

            <h1 className="font-extrabold text-[40px] text-[#1877f2]">Log in facebook</h1>


           
            <input type="text" 
            onChange={(e)=> setUserInput(e.target.value)  } className="bg-transparent w-[400px] indent-2 h-[45px] p-4 rounded border-2 border-black text-black" placeholder="enter your name please"/>


            <input type="text"
            onChange={Anotherinp}  className="bg-transparent w-[400px] indent-2 h-[45px] rounded border-2 border-black p-4 text-black" placeholder="enter your name please"/>

            {/* <button className="border-2 p-[30px] w-[100px]">Log in</button> */}

            <Button bg="blue" padding = "px-8 py-4 " width = "w-100" ButtonText = "log in "/>
            <Button bg="blue" padding = "px-8 py-4 " width = "w-100" ButtonText = "sign up "/>
            <p>forgotten account</p>

            

            
         

        </div>

        </div>


        <div className="show">



         <div>Name entered:{userInput}</div> 
             <div>password entered:{userInputA}</div>

             </div>

        </React.Fragment>


       

        
    )

}

export default Facebook