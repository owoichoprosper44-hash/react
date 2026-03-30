import React, { useState } from "react";

const Input = ()=>{
    const[inputData, setInputData] = useState({username:"", password:""});
    const [data, setData] = useState([]);



    // 
    

    // function Display(){
    //     setDisplay(input);
    // }
    // function Third(){
    //     secondDisplay(secondinp)
    // }
    function handleSubmit(){
    setData((prev) => { return [...prev, inputData]}  )

    }

    function handleInputChange(e){
const {name, value} = e.target;
        setInputData((prev) => ({...prev, [name]: value}));
    }
    return(
        <div className="flex flex-col w-[400px] gap-2 pt-3 px-3" >

            <input type="text" name="username" value={inputData.username} className="border" onChange={handleInputChange} />
            <input type="text" name="password" value={inputData.password} className="border" onChange={handleInputChange} />

            {/* <button className="border">inputData.username</button> */}
            <button  onClick={handleSubmit} className="border">submit</button>

            {data.map(d => <h1 key={d} className="bg-red-500"><div>
                <h2>{d.username}</h2>
                <h2>{d.password}</h2>
                </div></h1>)}
            

            
            {/* <h2 className="bg-black text-white">{data[0]?.password}</h2> */}
            

        </div>
    )
}
export default Input