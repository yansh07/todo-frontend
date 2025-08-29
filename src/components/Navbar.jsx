import React from "react";

function Navbar() {
  return (
    <div className="bg-gradient-to-r from-[#413d3d] to-[#a4a3a6] flex flex-row">
      <div>
        {/* Logo + Title */}
        <div className="top-3 left-4 fixed p-1 flex items-center gap-2">
          <i className="fa-solid fa-file-word text-2xl text-gray-50"></i>
          <span className="text-2xl font-[satoshi] font-extrabold text-gray-50">
            PlanIt
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-6 fixed right-4 top-3">
          {/* Login Button */}
          <a href="#">
            <button
              className="font-[satoshi] text-lg font-semibold text-white px-4 py-2 rounded-lg 
            bg-gradient-to-r from-white/50 to-gray-700
            shadow-md hover:shadow-xl hover:scale-105 
            transition-all duration-300 ease-in-out backdrop:blur-3xl"
            >
              Login
            </button>
          </a>

          {/* Sign Up Button */}
          <a href="#">
            <button
              className="font-[satoshi] text-lg font-semibold text-white px-4 py-2 rounded-lg 
            bg-gradient-to-r from-white/50 to-gray-700 
            shadow-md hover:shadow-xl hover:scale-105 
            transition-all duration-300 ease-in-out backdrop:blur-3xl"
            >
              Sign up
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
