import React, { useState } from 'react'

const Count = () => {
    const [count, setCount] = useState(0)
    function addCount(){
         setCount(count + 1)
    }

    
  return (
    <div className='h-screen'>
        <button className='border-2 p-[10px] w-[50px]' onClick={addCount}>{count}</button>

        <button className='border-2 w-[20px] h-[20px] p-[12px] px-[30px] bg-black '></button>
      
    </div>
  )
}

export default Count
