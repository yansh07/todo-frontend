import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-gradient-to-r from-[#413d3d] to-[#a4a3a6] flex flex-row">
      <div>
        {/* Logo + Title */}
        <div className="top-3 left-4 fixed p-1 flex items-center  md:ml-24 md:mt-4 lg:ml-52 lg:mt-8 xl:ml-92">
          <i className="fa-solid fa-file-word text-3xl md:text-4xl xl:text-5xl text-gray-50"></i>
          <span className="text-3xl font-[satoshi] font-extrabold text-gray-50 md:text-4xl xl:text-5xl">
            PlanIt
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-4 md:gap-6  fixed right-4 top-3 md:mr-24 md:mt-4 lg:mr-52  lg:mt-8 xl:mr-92">
          {/* Login Button */}
          <Link to="/">
            <button
              className="font-[satoshi] text-lg font-semibold text-white px-4 py-2 rounded-lg 
            bg-gradient-to-r from-white/50 to-gray-700
            shadow-md hover:shadow-xl hover:scale-105 
            transition-all duration-300 ease-in-out backdrop:blur-3xl xl:text-xl"
            >
              Login
            </button>
          </Link>

          {/* Sign Up Button */}
          <Link to="/register">
            <button
              className="font-[satoshi] text-lg font-semibold text-white px-4 py-2 rounded-lg 
            bg-gradient-to-r from-white/50 to-gray-700 
            shadow-md hover:shadow-xl hover:scale-105 
            transition-all duration-300 ease-in-out backdrop:blur-3xl xl:text-xl"
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
