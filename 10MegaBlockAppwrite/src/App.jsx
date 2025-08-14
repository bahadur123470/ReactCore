import React, {useState, useEffect, use} from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login, logout} from './store/auth/authSlice'
import { Header, Footer } from './components/index'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className='w-full block'>
        <Header/>
        <main>
          <h1 className='text-blue-700 bg-green-500'>Hello World</h1>
          {/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
