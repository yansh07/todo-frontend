import React from "react";

function Navbar() {
  return (
    <div className="bg-gradient-to-r from-[#413d3d] to-[#a4a3a6] flex flex-row">
      <div className="p-2">
        <i class="fa-solid fa-file-word text-4xl text-gray-50"></i>
        <span className="gap-4 text-4xl font-[santoshi] font-bold text-gray-50">PlanIt</span>
      </div>
      <div>
        <a href="">
        <button>Log in</button>
      </a>
      </div>
    </div>
  );
}

export default Navbar;
