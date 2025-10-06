// import React from "react";
// import ThemeToggle from "./Themetoggle";

// function Footer() {
//   return (
//     <div className="bg-primary bg-theme-primary flex flex-col relative px-4 md:px-36 pt-6 md:py-6 lg:px-16 lg:py-4 xl:px-32 xl:py-4 lg:flex-col lg:gap-6 md:flex-row">
//       <div>
//         <p className="text-theme-primary text-primary-accent ml-3 mt-3 text-2xl xl:text-3xl font-medium">
//           PlanIt
//         </p>
//         <p className="font-[Nunito] text-theme-secondary font-light text-lg xl:text-xl ml-3 mr-18 lg:max-w-5xl md:max-w-3xs">
//           A minimalist canvas to save your plans, and moments.
//         </p>
//       </div>
//       <div className="xl:mb-6 lg:mb-8 lg:ml-0 md:mb-12 md:ml-8">
//         <h1 className="font-[Nunito] text-theme-primary text-primary-accent text-xl xl:text-2xl font-medium ml-3 mt-6 lg:mt-0 md:mt-0">
//           Connect
//         </h1>
//         <ul className="font-[Nunito]  ml-3 mt-2 text-lg xl:text-xl">
//           <li className="font-light  text-theme-secondary ">
//             <a href="https://github.com/yansh07">
//               <i class="fa-brands fa-github  "></i>{" "}
//               - GitHub
//             </a>
//           </li>
//           <li className="font-light  text-theme-secondary">
//             <a href="https://x.com/yansh_08">
//               <i class="fa-brands fa-x-twitter "></i>{" "}
//               - X(Twitter)
//             </a>
//           </li>
//           <li className="font-light text-theme-secondary ">
//             <a href="mailto:pksingh69313@gmail.com">
//               <i class="fa-solid fa-inbox "></i>{" "}
//               - Email
//             </a>
//           </li>
//         </ul>
//       </div>
//       <div>
//         <div>
//           <div className="border-t border-theme border-theme-accent ml-3 mr-3 mt-4 lg:absolute lg:bottom-12 lg:left-16 lg:px-58 xl:px-62 xl:ml-20 md:absolute md:bottom-14 md:px-56 md:left-36"></div>
//         </div>
//         <div className="md:flex md:flex-row lg:flex-row font-[Nunito] mt-3 mb-2 lg:absolute lg:bottom-2 lg:left-6 lg:px-10 xl:px-26 md:bottom-4 md:absolute md:left-46">
//           <p className="text-sm font-light ml-3 xl:text-xl text-theme-secondary">© 2025 PlanIt: NotesApp.</p>
//           <p className="font-light text-sm ml-3 xl:text-xl text-theme-secondary ">
//             <a
//               href="https://github.com/yansh07
// "
//             >
//               Made with 🤍 by Priyanshu
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Footer;
import React from "react";
import { Github, Twitter, Mail, Heart } from "lucide-react";

function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/yansh07",
      color: "hover:text-purple-400"
    },
    {
      name: "X(Twitter)",
      icon: <Twitter className="w-5 h-5" />,
      url: "https://x.com/yansh_08",
      color: "hover:text-cyan-400"
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:pksingh69313@gmail.com",
      color: "hover:text-pink-400"
    }
  ];

  return (
    <footer className="relative mt-20 bg-gradient-to-b from-transparent to-black/30 backdrop-blur-xl border-t border-white/10">
      {/* Animated glow effect at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-12 md:px-12 lg:px-20">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand section */}
          <div className="space-y-4">
            <h2 className="text-3xl  text-primary-theme  bg-clip-text font-semibold font-[Nunito]">
              PlanIt
            </h2>
            <p className="text-primary-theme text-theme-accent text-lg font-[Nunito] leading-relaxed max-w-sm">
              A minimalist canvas to save your plans, and moments.
            </p>
            {/* Decorative gradient bar */}
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full"></div>
          </div>

          {/* Connect section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary-theme text-primary-accent font-[Nunito] mb-6">
              Connect
            </h3>
            <div className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 text-theme-secondary text-theme-accent ${link.color} transition-all duration-300 font-[Nunito]`}
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                    {link.icon}
                  </div>
                  <span className="text-lg">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick stats or additional info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary-theme  font-[Nunito] mb-6">
              Built with
            </h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'MongoDB', 'Auth0'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-sm text-primary-theme text-theme-accent font-[Nunito] transition-all duration-300 hover:scale-105 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-theme-secondary text-theme-accent font-[Nunito] text-sm md:text-base">
              © 2025 PlanIt: NotesApp. All rights reserved.
            </p>

            {/* Made with love */}
            <a
              href="https://github.com/yansh07"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-primary-theme text-theme-accent  transition-colors duration-300 font-[Nunito]"
            >
              <span className="text-sm md:text-base">Made with</span>
              <Heart className="w-4 h-4 text-pink-500 group-hover:scale-125 transition-transform duration-300 fill-pink-500" />
              <span className="text-sm md:text-base">by Priyanshu</span>
            </a>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none"></div>
    </footer>
  );
}

export default Footer;