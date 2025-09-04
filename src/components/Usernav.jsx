import React from "react";
import { FilePlus, User, Bell, Search } from "lucide-react";
import "/src/index.css";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

function Usernav() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-purple-900 via-violet-800 to-indigo-800 backdrop-blur-xl border-b border-purple-500/20 p-3 shadow-2xl">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-3 group">
          <div className="relative">
            <i className="fa-solid fa-file-word text-3xl md:text-4xl xl:text-4xl text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text drop-shadow-lg"></i>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 blur-lg opacity-30 animate-pulse"></div>
          </div>
          <span className="text-2xl md:text-3xl xl:text-4xl font-[satoshi] font-black text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text hover:scale-105 transition-transform duration-300 cursor-pointer">
            PlanIt
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          
          {/* Search Icon */}
          <div className="relative group hidden md:block">
            <Search className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 group-hover:scale-110" />
            <span className="absolute top-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 text-xs text-white bg-gray-900/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Search notes
            </span>
          </div>

          {/* Notifications */}
          {/* <div className="relative group hidden md:block">
            <Bell className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 group-hover:scale-110" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full animate-pulse"></div>
            <span className="absolute top-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 text-xs text-white bg-gray-900/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Notifications
            </span>
          </div> */}

          {/* Add Note Button */}
          <div className="relative group" onClick={() => navigate("/add-note")}>
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-3 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 cursor-pointer">
              <FilePlus className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="absolute top-12 left-1/2 -translate-x-1/2 w-max px-3 py-1 text-xs text-white bg-gray-900/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-medium">
              Add new note
            </span>
            {/* Floating particles effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
          </div>

          {/* Profile Section */}
          <div className="relative group" onClick={() => navigate("/profile")}>
            <div className="relative">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 p-[2px] cursor-pointer group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full bg-gray-800/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-gray-800"></div>
            </div>
            
            {/* Profile dropdown hint */}
            <span className="absolute top-12 right-0 w-max px-3 py-1 text-xs text-white bg-gray-900/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-medium">
              Profile & Settings
            </span>
          </div>
        </div>
      </div>
      
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
    </div>
  );
}

export default Usernav;