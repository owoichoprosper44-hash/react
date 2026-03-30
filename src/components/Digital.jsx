import React, { useEffect, useState } from 'react'

const Digital = () => {
  const [seconds, setSeconds] = useState(0)
  const [minute, setMinute] = useState(0)
  const [hour, sethour] = useState(0)
  useEffect(()=>{
    const timer = setInterval(() => {
      setSeconds((prevsec) => prevsec + 1)
      if(prevsec === 59 ){
        setMinute(minute => minute + 1)
        
      }
      
    }, 1000);
    return() => clearInterval(timer)
  }, [])

  // const minutes = Math.floor( seconds / 60)
  // const secs = seconds % 60;
  return (
    <div>
      {/* {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}  */}
    </div>
    
  )
}

export default Digital
