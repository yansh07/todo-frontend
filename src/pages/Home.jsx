import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  return (
    <div>
        <Login />
        <Register />
        <Dashboard />
    </div>
  )
}

export default Home