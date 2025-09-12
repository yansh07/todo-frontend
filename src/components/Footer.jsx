import React from "react";
import ThemeToggle from "./Themetoggle";

function Footer() {
  return (
    <div className="bg-primary bg-theme-primary flex flex-col relative px-4 md:px-36 pt-6 md:py-6 lg:px-16 lg:py-4 xl:px-32 xl:py-4 lg:flex-col lg:gap-6 md:flex-row">
      <div>
        <p className="text-gray-50  hover:text-yellow-400 transition-all duration-300 ml-3 mt-3 font-semibold text-2xl xl:text-3xl hover:font-extrabold">
          PlanIt
        </p>
        <p className="font-[satoshi] text-gray-400 font-medium text-lg xl:text-xl ml-3 hover:text-white mr-18 lg:max-w-5xl md:max-w-3xs">
          A minimalist canvas to save your plans, and moments.
        </p>
      </div>
      <div className="xl:mb-6 lg:mb-8 lg:ml-0 md:mb-12 md:ml-8">
        <h1 className="font-[satoshi] text-gray-100 text-xl xl:text-2xl font-bold ml-3 mt-6 lg:mt-0 md:mt-0">
          Connect
        </h1>
        <ul className="font-[satoshi] text-gray-400 ml-3 mt-2 text-lg xl:text-xl">
          <li className="font-medium  hover:text-yellow-400">
            <a href="https://github.com/yansh07">
              <i class="fa-brands fa-github text-white/80 hover:text-yellow-400 "></i>{" "}
              - GitHub
            </a>
          </li>
          <li className="font-medium  hover:text-yellow-400">
            <a href="https://x.com/yansh_08">
              <i class="fa-brands fa-x-twitter text-white/80 hover:text-yellow-400"></i>{" "}
              - X(Twitter)
            </a>
          </li>
          <li className="font-medium  hover:text-yellow-400">
            <a href="mailto:pksingh69313@gmail.com">
              <i class="fa-solid fa-inbox text-white/80 hover:text-yellow-400"></i>{" "}
              - Email
            </a>
          </li>
        </ul>
      </div>
      <div>
        <div>
          <div className="border-t border-gray-500 ml-3 mr-3 mt-4 lg:absolute lg:bottom-12 lg:left-16 lg:px-58 xl:px-62 xl:ml-20 md:absolute md:bottom-14 md:px-56 md:left-36"></div>
        </div>
        <div className="md:flex md:flex-row lg:flex-row font-[satoshi] text-gray-400 mt-3 mb-2 lg:absolute lg:bottom-2 lg:left-6 lg:px-10 xl:px-26 md:bottom-4 md:absolute md:left-46">
          <p className="text-sm ml-3 xl:text-xl">© 2025 PlanIt: NotesApp.</p>
          <p className="font-medium text-sm ml-3 xl:text-xl  hover:text-yellow-400">
            <a
              href="https://github.com/yansh07
"
            >
              Made with 🤍 by Priyanshu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
