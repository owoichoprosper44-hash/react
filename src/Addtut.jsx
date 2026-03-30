import React, { useState } from 'react'

const Addtut = () => {

    const [cart, setCart] = useState([])

     const products = [
    { id: 1, name: "T-Shirt", price: 20 },
    { id: 2, name: "Jeans", price: 40 },
    { id: 3, name: "Sneakers", price: 60 },
  ];
     

  

  function addToCart(item){
    console.log("this is the item", item)
    setCart([...cart, products])
    console.log(cart)


    

  }
  return (
    
    <div className='h-screen flex gap-10'>
        {
          cart.map((product) => (
            <div>
            <div>{product.id}</div>
            <div>{product.name}</div>
            <div>{product.price}</div>

            <button onClick={() => addToCart(product)}>hello</button>

            </div>

          ))
        }
        
  
  <div>
    




  </div>

 
    </div>

    
  )
}

export default Addtut
