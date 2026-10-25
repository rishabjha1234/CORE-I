import React, { useState } from "react";

const App = () => {
  // let count = 0;
  const [count,setCount] = useState(0);


  console.log("count:",count)

  
  function handleIncrement(){
   
    setCount(count+1);
    

  
  }
  return (
    <div className="bg-zinc-200 text-black w-full h-screen flex flex-col justify-center items-center">

      <h1>Count: {count}</h1>
      <button className="cursor-pointer" onClick={handleIncrement}>Increment</button>
     
    </div>
  );
};

export default App;
