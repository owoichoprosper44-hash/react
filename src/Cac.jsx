import React, { useState } from 'react'

const Cac = () => {
    const [display, setDisplay] = useState()
    function handleClick(value){
        console.log("i received value :", value)
    }

    
  return (
    <div className='w-screen h-screen'>
        <button onClick={()=> handleClick("7")}>7</button>
        <button  onClick={handleClick}>8</button>

      
    </div>
  )
}

export default Cac
