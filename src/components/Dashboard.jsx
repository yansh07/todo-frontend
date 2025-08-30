import React from 'react'

function Dashboard() {
  return (
    <div className='bg-gradient-to-br from-[#060010] to-slate-600 p-4'>
      <div className="flex items-center space-x-2 px-0 md:px-18 lg:px-42 xl:px-24">
          <i className="fa-solid fa-file-word text-3xl md:text-4xl xl:text-5xl text-blue-400"></i>
          <span className="text-3xl font-[satoshi] font-extrabold text-blue-400 md:text-4xl xl:text-5xl ">
            PlanIt
          </span>
        </div>
    </div>
  )
}

export default Dashboard