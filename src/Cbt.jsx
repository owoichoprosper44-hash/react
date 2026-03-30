import React, { useEffect, useState } from 'react'


const Cbt = () => {

  const [count, setCount] = useState(0)

  const [timeUp, setTimeUp] = useState(false);
  


  // setInterval(() => {
  //   setSeconds(seconds - 1)
  // }, 1000);

 



   
  



    const[index, setIndex] = useState(0);

    const[score, setScore] = useState(0);
       const [off, setOff] = useState(false);

       const [seconds, setSeconds] = useState(30) // 30 minutes

useEffect(() => {
  const timer = setInterval(() => {
    setSeconds(prev => {
      if (prev === 0) {
        clearInterval(timer)
        setTimeUp(true)
        return 0
      }
      return prev - 1
    })
  }, 1000)

  return () => clearInterval(timer)
}, [])
       

      
  



    
    

    function next(){
        setIndex(index => index + 1);
        console.log(index);
        setOff(false)
      
        
    }

    function previous(){

      setIndex(index => index - 1)
      if(index > questions[index].options.length && index > questions[index].question.length){
        console.log("start from beggining");
        setIndex(0)
      }

    }

    
    


  
    function checkAnswer(opps){
     opps == questions[index].answer
        if(opps == questions[index].answer ){
            console.log('it is correct');
            setScore(prev => prev + 1);
              setOff(true);
              
              console.log(off);

              

              



        


            
            
            

            
            
            
            
        }
        else{
            console.log("it is wrong")
            
        }
    }
    


 let questions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Capital of France?",
    options: ["London", "Berlin", "Paris", "Rome"],
    answer: "Paris"
  },
    {
    question: "Capital of berlin?",
    options: ["London", "Berlin", "Paris", "Rome"],
    answer: "Paris"
  },

{
    question: "what is a noun?",
    options: ["person", "place", "Paris", "Rome"],
    answer: "person"
  },

  {
    question: "who is the best developer at csc shed?",
    options: ["prosper", "samuel", "Qudus", "Rome"],
    answer: "Qudus"
  },

   {
    question: "who is the best developer at csc shed?",
    options: ["prosper", "samuel", "Qudus", "Rome"],
    answer: "Qudus"
  }
];









  return (
    <div className='relative w-screen h-screen'>

      <div>{questions[index].question}</div>

      <div>
        {questions[index].options.map((opps) => (
          <li key={opps}>
            <button
              disabled={off}
              className={`border-2 mt-2 ml-3 p-2 w-20 ${off && opps == questions[index].answer ? "bg-green-700" : "bg-red-300"} text-white`}
              onClick={() => checkAnswer(opps)}
            >
              {opps}
            </button>
          </li>
        ))}
      </div>

      <button onClick={next} className='border-2 mt-2 ml-3 p-2 w-20 bg-black text-white'>next</button>
      <button onClick={previous} className='border-2 mt-2 ml-3 p-2 w-20 bg-black text-white'>previous</button>

      <div className='absolute top-0 left-[700px]'>your score is {score}</div>

      <div>{seconds}</div>

    
      


      <div className={`absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center text-white text-4xl ${timeUp ? "block" : "hidden"}`}>
      opps your time is up
      </div>

      

    </div>
  )

        

  

        

          

        

        
        
      
    
}

export default Cbt
