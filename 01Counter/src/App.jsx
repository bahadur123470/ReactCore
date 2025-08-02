import { useState } from 'react'
import './App.css'

function App() {

  let [counter, setCounter] = useState(0)
  let maxValue = 20;
  let minValue = 0;

  const addValue = ()=> {
    if (counter < maxValue){
      setCounter(counter + 1);
    }
    else {
      alert("You cannot add above " + maxValue + "!")
    }
  }
  const removeValue = ()=> {
    if (counter > minValue){
      setCounter(counter - 1);
    }
    else {
      alert("You cannot remove below " + minValue + "!")
    }
  }
  const reset = ()=> {
    const confirmReset = confirm("Are you sure you want to reset the counter?")
    if (confirmReset){
      setCounter(0);
    }
  }

  return (
    <>
    <h1>Counter</h1>
    <h3>Counter Value: {counter}</h3>
    <button onClick={addValue}>Add</button>
    <br/>
    <button onClick={removeValue}>Remove</button>
    <br/>
    <button onClick={reset}>Reset</button>
    </>
  )
}

export default App
