import React, { useState, useEffect } from "react";
import { FilePlus, User, Bell } from "lucide-react";
import "/src/index.css";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ThemeToggle from "./Themetoggle";
import toast from "react-hot-toast";

function Usernav() {
  const navigate = useNavigate();
  const isDesktop = window.innerWidth >= 1280;
  const toastShown = localStorage.getItem("toastShowOnce");
  const {
    user: auth0User,
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated || !auth0User) return;

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          },
        });

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setDbUser(data);
        } else {
          console.error("Error fetching user data:", res.statusText);
        }
      } catch (err) {
        console.error("Error fetching user:", err.message);
      }
    };

    fetchUser();
  }, [auth0User, isAuthenticated, getAccessTokenSilently]);

  // Don't render if Auth0 is still loading
  if (isLoading) return null;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[satoshi] font-bold bg-clip-text hover:scale-105 transition-transform duration-300 cursor-pointer">
              PlanIt
            </span>
          </div>

          {/* Right Section - Navigation Items */}
          <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
            {/* Add Note Button */}
            <div className="relative group">
              <button
                onClick={() => {
                  if (!toastShown && isDesktop) {
                    toast.success("💡 Tip: Use Alt+N to quickly add notes");
                    localStorage.setItem("toastShownOnce", "true");
                  }
                  navigate("/add-note");
                }}
                className="theme-btn shadow-card shadow-glow p-2 sm:p-3 rounded-xl sm:rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 focus:outline-none focus:ring-2 focus:ring-theme-accent/50"
                aria-label="Add new note"
              >
                <FilePlus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>

              {/* Tooltip */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs font-medium backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-60">
                Add new note
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>

            {/* Profile Button */}
            <div className="relative group flex-shrink-0">
              <button
                onClick={() => {
                  if (!toastShown && isDesktop) {
                    toast.success("💡 Tip: Use Shift+P to quickly access your profile");
                    localStorage.setItem("toastShownOnce", "true");
                  }
                  navigate("/profile");
                }}
                className="relative focus:outline-none focus:ring-2 focus:ring-theme-accent/50 rounded-xl"
                aria-label="Profile & Settings"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl sm:rounded-2xl p-[2px] cursor-pointer group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full btn-theme backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden">
                    {dbUser?.profilePic || auth0User?.picture ? (
                      <img
                        src={dbUser?.profilePic || auth0User?.picture}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                      />
                    ) : (
                      <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>
                </div>

                {/* Online Indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-theme-primary bg-green-500"></div>
              </button>

              {/* Tooltip */}
              <div className="absolute top-full right-0 mt-2 px-2 py-1 text-xs font-medium backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-60">
                Profile & Settings
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Usernav;
