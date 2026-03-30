import React, { useState } from 'react'

const Paystack = () => {

    const[click, setClick] = useState(false)
  return (
    
    <div className='p-[10px] items-center justify-center w-screen'>

        <div className={`bg-green-400 rounded-[10px] w-[400px] flex justify-center ${click ? "hidden":"block text-white"}  text-white fixed p-20px`}>i really love you so much vito</div>
        <button className='border-[2px] mt-[30px] text-white bg-pink-400 mt-2 p-[10px] rounded-[10px]' onClick={()=>setClick(!click)}>click</button>
      
    </div>
  )
}

export default Paystack
