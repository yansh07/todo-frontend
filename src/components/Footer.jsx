import React from "react";

function Footer() {
  return (
    <div className="bg-[#100227] flex flex-col relative z-50 px-4 md:px-8 pt-2 md:py-2 lg:px-14 lg:py-6 xl:px-32 xl:py-4">
      <a
        href="https://github.com/yansh07/todo-frontend"
        className="text-gray-50  hover:text-blue-400 transition-all duration-300 ml-3 mt-3 font-semibold text-2xl"
        target="_blank"
        rel="noopener noreferrer"
      >
        PlanIt
      </a>
      <p className="font-[satoshi] text-gray-400 font-medium text-lg ml-3 hover:text-white mr-10">
        A minimalist canvas to save your plans, and moments.
      </p>
      <div>
        <h1 className="font-[satoshi] text-gray-100 text-xl font-bold ml-3 mt-6">
          Connect
        </h1>
        <ul className="font-[satoshi] text-gray-400 ml-3 mt-2 text-lg">
          <li className="font-medium  hover:text-white">
            <a href="https://github.com/yansh07">
              <i class="fa-brands fa-github text-white/80 hover:text-white "></i> - GitHub
            </a>
          </li>
          <li className="font-medium  hover:text-white">
            <a href="https://x.com/yansh_08">
              <i class="fa-brands fa-x-twitter text-white/80 hover:text-white"></i> - X(Twitter)
            </a>
          </li>
          <li className="font-medium  hover:text-white">
            <a href="mailto:pksingh69313@gmail.com">
              <i class="fa-solid fa-inbox text-white/80 hover:text-white"></i> - Email
            </a>
          </li>
        </ul>
      </div>
      <div>
        <div className="border-t border-gray-500 ml-3 mr-3 mt-4"></div>
      </div>
      <div className="font-[satoshi] text-gray-400 mt-3 mb-6">
        <p className="text-sm ml-3">© 2025 PlanIt: NotesApp.</p>
        <p className="font-medium text-sm ml-3 hover:text-white">
          <a
            href="https://github.com/yansh07
"
          >
            Made with 🤍 by Priyanshu
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
