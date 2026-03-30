import React, { useState } from 'react'

const Reacttt = () => {

    const [myFavorite, setMyFavorite] = useState([])

    const [allMyFave, setAllMyFavorite] = useState(["prosper", "samuel", "emmanuel"])

    const addItem = ()=>{
        setMyFavorite((prev => [...prev, "test"]))
    }

    

     

    
  return (
    <div>
        <button onClick={addItem}>add item</button>

        <div>

        {myFavorite.map((prosper)=>(

            <li>{prosper}</li>


        ))}

        </div>

        

        
      
    </div>
  )
}

export default Reacttt
