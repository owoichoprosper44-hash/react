import React, { useEffect, useState } from 'react'

const Anotherdigit = () => {
    const [seconds, setSeconds] = useState(0)
    const[minute, setMinute] = useState(0)
    const[hour, setHour] = useState(0)

    useEffect(()=>{
      const timer = setInterval(() => {
        setSeconds(seconds => seconds + 1)
        if(seconds === 59){
          setMinute(minute => minute + 1)
          setSeconds(0)
        }

        if(minute === 59){
          setHour(hour => hour + 1)
          setMinute(0)
        }
        
      }, 1000);
      return () => clearInterval(timer)
    })
  return (

    <div>
        
        <p className='bg-black text-white text-8xl'>{seconds}:{minute}:{hour}</p>
        
      
    </div>
  )
}

export default Anotherdigit
