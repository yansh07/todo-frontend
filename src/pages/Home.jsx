import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'

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