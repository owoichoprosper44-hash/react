import React, { useState } from 'react'

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([])

    const ingredientListItem = ingredients.map((ingredient)=>(
                <ul key={ingredient}>{ingredient}</ul>
            ))

    function handleSubmit(event){
        event.preventDefault()
        console.log("form submitted for now")
        const formData = new formData(event.currentTarget)
        const newIngredient = FormData.get("ingredient")
        setIngredients(previous => ([...previous, newIngredient]))
    }
  return (
    <div>
        <form onSubmit={handleSubmit} className='add-ingredient-form'>
            <input type="text"
            placeholder='e.g oregano'
            aria-label='add ingredient'
            name="ingredient" />

            <button>add ingredient</button>
            <h1>{ingredientListItem}</h1>
            

    
        </form>
      
    </div>
  )
}

export default Ingredients
