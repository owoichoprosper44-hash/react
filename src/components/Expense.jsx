import React, { useEffect, useState } from 'react'

const Expense = () => {

    const[input, setInput] = useState("")
    const[amount, setAmount] = useState(0)
    const[display, setDisplay] = useState([])
    

    

    const handleClick = ()=>{
      const Newamount = amount + Number(input)
      setAmount(Newamount)
    // setAmount(prev =>prev + Number(input))

    setDisplay([...display, Newamount])
    
    }
  return (
    
    <div>

        <input type="text" className='border-2 border-black'  onChange={(e)=>setInput(e.target.value)} />
        <input type="number" onChange={(e)=>setAmount(e.target)} />

        <button onClick={handleClick}>click</button>
        

        {
            display.map((prosper, index)=>(
                <li key={index}>{prosper}</li>
            ))
        }
      
    </div>
  )
}

export default Expense
