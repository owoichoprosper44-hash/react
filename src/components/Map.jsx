import React from "react";

const Map = ()=>{
    // const fruits = ["mango", "apple", "banana", "watermelon"]

    const userProfile = [
        {
            
            name: "prosper1",
            bio : "lorem ipsum",
            id: 1,
            color : "grey"
        },

        {
            
            name: "prosper2",
            bio : "lorem ipsum 2",
            id: 2,
            color : "grey"
        },

        {
            
            name: "prosper3",
            bio : "loremipsum 3",
            id:3,
            color : "grey"
        },
        
    ]
    return(
        <div className="grid grid-cols-3 text-center gap-4  " >
    {
    userProfile.map((user, index)=>(
        <div key={index} className="border p-4 shadow-2xl rounded-2xl bg-yellow-400" >
            <div className="text-3xl">{user.name}</div>
            <div>{user.bio}</div>
            <div>{user.id}</div>
            <div>{user.color}</div>
        </div>
    ))
    
    
    
    
    
    
    
    
    
    }

           












            <div >
                {/* {
                    userProfile.map((profile, index)=>{
                        return(
                            <li key={index}>{profile}</li>
                        )
                    })
                } */}
            </div>

             {/* fruits.map((fruit , index)=>(

                        <li key = {index}>{fruit}</li> */}

            
        </div>
    )
}
export default Map