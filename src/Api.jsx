import React, { useEffect, useState } from 'react'

const Api = () => {
    const [Loading, isLoading] = useState(true);
    const [error, setError] = useState(null)
    const [data, setData] = useState([])
    const [post, setPost] = useState([])
    

    try{

    const URL = "https://jsonplaceholder.typicode.com/users"
    const fetchData = async () => {
      const Response = await fetch(URL)
      console.log(Response)
      if(!Response.ok) throw new Error("something is going wrong")
        const result = await Response.json()
      console.log( "result",result)
    }
     fetchData()

  }

    catch(error){
      console.log("something went wrong",error)
      console.log(setError(error.message))
    }

   




    
    
  return (
    
    <div className='w-screen h-screen bg-yellow-300'>
      hello
      
    </div>
  )
}

export default Api
