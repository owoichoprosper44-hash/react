import React from 'react'

const TodoL = () => {

    const todos = ["Eat", "Sleep", "Code"];
   
function handleDelete(indexToDelete){
    console.log("deleting index",indexToDelete)
}
  return (

    
    <div>

        {
             todos.map((todo, index) => {
   console.log("Todo:", todo);
   console.log("Index:", index);
    <button onClick={() => handleDelete(index)}>delete</button>

})


        }

       

        
        
        
        
      
    </div>
  )
}

export default TodoL
