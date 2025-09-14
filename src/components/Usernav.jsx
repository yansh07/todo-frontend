import React, { useState, useEffect } from "react";
import { FilePlus, User, Bell } from "lucide-react";
import "/src/index.css";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ThemeToggle from "./Themetoggle";

function Usernav() {
  const navigate = useNavigate();
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
    <div className="relative z-50  backdrop-blur-xl border-b border-theme border-theme-accent p-3 shadow-2xl">
      <div className="flex items-center justify-between mr-10 md:mr-14 lg:mr-12 xl:px-16 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className=" space-x-4 md:ml-8 lg:ml-14 xl:-ml-1">
          <span className="hidden md:block text-2xl md:text-3xl xl:text-4xl font-[satoshi] font-medium   bg-clip-text hover:scale-105 transition-transform duration-300 cursor-pointer">
            PlanIt
          </span>
        </div>

        {/* Right Section - Consolidated */}
        <div className="flex items-center space-x-6 relative z-50">
          {/* Add Note Button */}
          <div className="relative group theme-btn shadow-card shadow-glow" onClick={() => navigate("/add-note")}>
            <div className=" p-3 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 cursor-pointer">
              <FilePlus className=" w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="absolute top-12 left-1/2 -translate-x-1/2 w-max px-3 py-1 text-xs backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none  font-medium">
              Add new note
            </span>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Profile Button */}
          <div className="relative group" onClick={() => navigate("/profile")}>
            <div className="relative">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl p-[2px] cursor-pointer group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full btn-theme backdrop-blur-sm rounded-2xl flex items-center justify-center overflow-hidden">
                  {(dbUser?.profilePic || auth0User?.picture) ? (
                    <img
                      src={dbUser?.profilePic || auth0User?.picture}
                      alt="profile"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <User className="w-5 h-5 " />
                  )}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2"></div>
            </div>
            <span className="absolute top-12 right-0 w-max px-3 py-1 text-xs backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-medium">
              Profile & Settings
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usernav;