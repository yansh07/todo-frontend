import React, { useState, useEffect } from "react";
import { FilePlus, User, Bell } from "lucide-react";
import "/src/index.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ThemeToggle from "./Themetoggle"; // Make sure to import ThemeToggle

function Usernav() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // ✅ Token error handler
  const handleAuthError = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/user/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401) {
          handleAuthError();
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          console.error("Error fetching user data:", res.statusText);
          try {
            const errorData = await res.json();
            if (errorData.error?.toLowerCase().includes("token")) {
              handleAuthError();
            } else {
              setUser(null);
            }
          } catch {
            setUser(null);
          }
        }
      } catch (err) {
        console.error("Network or parsing error:", err.message);
        setUser(null);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, setUser, navigate]);

  return (
    <div className="relative z-50 bg-primary backdrop-blur-xl border-b p-3 shadow-2xl">
      <div className="flex items-center justify-between px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-3 group">
          <div className="relative">
            {/* <i className="fa-solid fa-file-word text-3xl md:text-4xl xl:text-4xl text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-400 bg-clip-text drop-shadow-lg"></i> */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 blur-lg opacity-30 animate-pulse"></div> */}
          </div>
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
                  {user?.profilePic ? (
                    <img
                      src={user.profilePic}
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