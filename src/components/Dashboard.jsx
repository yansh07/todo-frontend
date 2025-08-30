import React from 'react';
import Usernav from './Usernav';
import SearchBox from './Search';

function Dashboard() {
  const userName = "Priyanshu"; // will fetch user's name from db

  return (
    <div className='bg-gradient-to-tr from-[#060010] to-slate-600 min-h-screen'>
      <Usernav />
      <div className='px-5 py-4 md:px-22 md:py-10 lg:px-26 xl:px-32'>
        {/* container holding name and search box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 className='font-[satoshi] text-gray-50 font-bold text-2xl md:text-3xl lg:text-4xl xl:text-4xl mb-4 sm:mb-0 sm:mr-4 lg:px-16 xl:-ml-5'>
            Hi {userName} 👋
          </h1>
        
            <SearchBox />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;