import React, { useState } from 'react'

const Opaypractice = () => {

  const [cards, setCards] = useState([
      { id: 1, number: "**** **** **** 1234", type: "Visa", holder: "John Doe" },
      { id: 2, number: "**** **** **** 5678", type: "MasterCard", holder: "Jane Doe" },
    ]);
    const [newCard, setNewCard] = useState({ number: "", type: "", holder: "" });


    function addCard(){
      setCards([...cards, newCard])
      console.log(cards)
    }
    
    

    
  return (
    <div className='border-2 m-2 grid-cols-4 ml-2 '>

      <input type="text" onChange={(e)=>setNewCard({ ...newCard, number: e.target.value })} />
      {console.log(newCard)}

      <input type="text" onChange={(e)=>setNewCard({...newCard, type:e.target.value})} />

      <input type="text" onChange={(e)=>setNewCard({...newCard, holder:e.target.value})} />



      <button onClick={addCard}>add card</button>
      
        
      
    </div>
  )
}

export default Opaypractice
