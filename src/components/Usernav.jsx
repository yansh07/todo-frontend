import React from "react";
import { FilePlus } from "lucide-react";
import "/src/index.css";

function Usernav() {
  return (
    <div className="bg-gradient-to-br from-[#060010] to-slate-600 p-2">
      <div className="flex items-center space-x-2 px-2 md:px-18 lg:px-42 xl:px-42">
        <i className="fa-solid fa-file-word text-3xl md:text-4xl xl:text-5xl text-blue-400"></i>
        <span className="text-3xl font-[satoshi] font-extrabold text-blue-400 md:text-4xl xl:text-5xl ">
          PlanIt
        </span>
        <div className="ml-20 md:ml-72 lg:ml-110 xl:ml-200">
          <div className="relative group inline-block">
            <FilePlus
              className="text-blue-400 cursor-pointer transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6 w-10 h-10 mt-2"
            />
            <span className="absolute top-2 left-1/2 -translate-x-1/2 mt-4 w-max px-2 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Add a new note
            </span>
          </div>
        </div>
        <div className="ml-6 md:ml-16">
            <div className="profilecircle border-2 w-11 h-11 cursor-pointer rounded-full border-blue-400"></div>
        </div>
      </div>
    </div>
  );
}

export default Usernav;
