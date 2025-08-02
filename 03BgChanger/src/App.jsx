import React, { useState } from 'react'

const App = () => {

  const [background, setBackground] = useState("grey")

  return (
    <>
    <div className='w-full h-screen duration-200' style={{backgroundColor: background}} >
      <div className='fixed flex flex-wrap justify-center bottom-20 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-5 shadow-2xl bg-white px-3 py-3 rounded-3xl'>
          <button onClick={() => setBackground("red")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg' 
          style={{backgroundColor: "red"}}>Red</button>
          <button onClick={() => setBackground("orange")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg' 
          style={{backgroundColor: "orange"}}>Orange</button>
          <button onClick={() => setBackground("yellow")}
          className='outline-none px-4 py-1 rounded-full text-black shadow-lg' 
          style={{backgroundColor: "yellow"}}>Yellow</button>
          <button onClick={() => setBackground("pink")}
          className='outline-none px-4 py-1 rounded-full text-black shadow-lg' 
          style={{backgroundColor: "pink"}}>Pink</button>
          <button onClick={() => setBackground("violet")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg' 
          style={{backgroundColor: "violet"}}>Violet</button>
          <button onClick={() => setBackground("green")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg' 
          style={{backgroundColor: "green"}}>Green</button>
          <button onClick={() => setBackground("royalblue")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg' 
          style={{backgroundColor: "royalblue"}}>Royal-Blue</button>
          <button onClick={() => setBackground("blue")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg' 
          style={{backgroundColor: "blue"}}>Blue</button>
          <button onClick={() => setBackground("indigo")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg' 
          style={{backgroundColor: "indigo"}}>Indigo</button>
          <button onClick={() => setBackground("black")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg' 
          style={{backgroundColor: "black"}}>Black</button>
          <button onClick={() => setBackground("white")}
          className='outline-none px-4 py-1 rounded-full text-black shadow-lg' 
          style={{backgroundColor: "white"}}>White</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
