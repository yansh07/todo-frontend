import React from 'react';
import GreetingComponent from './Greeting';

function Navbar() {
  return (
    <div className="bg-transparent flex flex-row top-6 left-1 xl:left-0 fixed p-1 items-center ml-2 md:ml-24 md:mt-4 lg:ml-52 lg:mt-8 xl:ml-90 xl:px-4">
      {/* Brand & Greeting Section */}
      <div className="flex items-center space-x-44 md:space-x-92 lg:space-x-60 xl:space-x-72">
        <div className="flex items-center space-x-2">
          <i className="fa-solid fa-file-word text-3xl md:text-4xl xl:text-5xl text-yellow-500"></i>
          <span className="text-3xl font-[satoshi] font-extrabold text-yellow-500 md:text-4xl xl:text-5xl ">
            PlanIt
          </span>
        </div>
        
        {/* The Greeting Component */}
        <div className="text-lg font-[satoshi] text-gray-200 md:text-xl xl:text-2xl lg:px-40">
          <GreetingComponent />
        </div>
      </div>
      
      {/* other navbar items here */}
      <div className="flex items-center space-x-4">
        {/* user profile*/}
      </div>
    </div>
  );
}

export default Navbar;