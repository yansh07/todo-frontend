import React from "react";
import ThemeToggle from "./Themetoggle";

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          
          {/* Brand & Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <i className="fa-solid fa-file-word text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-theme-primary text-theme-accent"></i>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[satoshi] font-extrabold text-theme-primary text-theme-accent">
                PlanIt
              </span>
            </div>
          </div>
          
          {/* Right Section - Navigation Items */}
          <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
            {/* Add any additional navigation items here */}
            <ThemeToggle />
            
            {/* Search Button */}
            {/* <button className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg hover:bg-theme-secondary/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-accent/50">
              <i className="fa-solid fa-search text-theme-primary text-theme-accent  text-sm sm:text-base"></i>
            </button> */}
            
            {/* Notifications */}
            {/* <button className="hidden md:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg hover:bg-theme-secondary/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-accent/50 relative">
              <i className="fa-solid fa-bell text-theme-primary text-sm sm:text-base"></i> */}
              {/* Notification Badge */}
              {/* <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </button> */}
            
            {/* User Profile Placeholder - Replace with actual user menu */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary btn-theme shadow-theme flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200">
              <i className="fa-solid fa-user text-white text-xs sm:text-sm"></i>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Button - Add if needed */}
      {/* <div className="md:hidden absolute top-4 right-4">
        <button className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-theme-secondary/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-accent/50">
          <i className="fa-solid fa-bars text-theme-primary"></i>
        </button>
      </div> */}
    </nav>
  );
}

export default Navbar;