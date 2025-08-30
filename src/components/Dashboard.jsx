import React from 'react'
import Usernav from './Usernav'

function Dashboard() {
  return (
    <div className='bg-gradient-to-tr from-[#060010] to-slate-600 min-h-screen'>
      <Usernav />
      <div className='px-6 py-4 md:px-22 md:py-10 lg:px-44'>
        <h1 className='font-[satoshi] text-gray-50 font-bold text-2xl'>Hi User 👋</h1>
      </div>
    </div>
  )
}

export default Dashboard