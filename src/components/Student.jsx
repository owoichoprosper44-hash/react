import React, { useState } from "react";



const Student = ()=>{

    const[text, setText]= useState("");

    function handleChange(e){
        setText(e.target.value)
    }






    
    

    const student = [
        {
            name:"prosper",
            id : 1,
            grade : "first class",
            matricno : 2021002561

        },
        {
            name:"prosper",
            id : 2,
            grade : "first class",
            matricno : 2021002561

        },

        {
            name:"samuel",
            id : 3,
            grade : "first class",
            matricno : 2021002561

        },

        {
            name:"prosper",
            id : 3,
            grade : "Third class upper",
            matricno : 2021002561

        },
        {
            name:"prosper",
            id : 1,
            grade : "first class",
            matricno : 2021002561

        }
    ]
    return(
        <div className="w-full">
            

            <input type="text"
             onChange={handleChange} />

            <h1>{text}</h1>

            

          


            
            
            
                <table className="w-screen">
                    <thead className="border  " >
                        <tr className=" bg-amber-700 capitalize">
                            <th className="border"  >name</th>
                            <th className="border">id</th>
                            <th className="border">grade</th>
                            <th>matric no</th>
                        </tr>
                    </thead >
                    <tbody className="text-center">
                        {student.map((prospiro, index)=>(
                        <tr key={index} className="border">
                            <td className="border">{prospiro.name}</td>
                            <td className="border">{prospiro.id}</td>
                            <td className="border">{prospiro.grade}</td>
                            <td className="border">{prospiro.matricno}</td>
                        </tr>

                          
                          ))}
                    </tbody>
                </table>


            
        </div>




    )

}
export default Student