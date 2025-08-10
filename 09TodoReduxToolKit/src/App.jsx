import React from 'react'
import AddTodo from './components/AddTodo'
import Todo from './components/Todo'

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Learn about redux toolkit</h1>
      <div className="w-full max-w-md">
        <AddTodo/>
        <Todo/>
      </div>
    </div>
  )
}

export default App
