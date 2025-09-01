import React from "react";

function Footer() {
  return (
    <div className="bg-[#100227] flex flex-col relative z-50">
      <a
        href="https://github.com/yansh07/todo-frontend"
        className="text-white hover:underline transition-all duration-300 p-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        PlanIt
      </a>
    </div>
  );
}

export default Footer;
