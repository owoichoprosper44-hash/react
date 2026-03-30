import React, { useState } from 'react'
import { useEffect } from 'react'






const Sideeffect = () => {

    const [count, setCount] = useState(0)

const increase = ()=>{
    setCount(prev => prev + 1)
}

const decrease = ()=>{
    setCount(prev => prev - 1)
}

    useEffect(()=>{
        console.log("component mounted")
        document.title =`count is ${count}`

    }, [count])
  return (
    <div>
sideEffects

<h1>{count}</h1>
      <button onClick={increase}>increase</button>
      <button onClick={decrease}>decrease</button>
    </div>
    
  )
}

export default Sideeffect
