import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Mail,
  Home,
  LogOut,
  Camera,
  FileText,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AboutMeInput from "./Aboutme";
import Footer from "./Footer";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const {
    user: auth0User,
    getAccessTokenSilently,
    logout,
    isLoading: isAuthLoading,
  } = useAuth0();

  // State
  const [dbUser, setDbUser] = useState(null); // Our user from MongoDB
  const isDesktop = window.innerWidth >= 1280;
  const toastShown = localStorage.getItem("toastShowOnce");
  const [notes, setNotes] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true); // Our own data loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience:
              import.meta.env.VITE_AUTH0_AUDIENCE ||
              `${import.meta.env.VITE_BACKEND_URL}`,
          },
        });

        console.log("Profile: Token length:", token.length); // Debug log

        // Use verify-user instead of profile endpoint
        const profileResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/verify-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              auth0Id: auth0User.sub,
              email: auth0User.email,
              name: auth0User.name,
              picture: auth0User.picture,
            }),
          }
        );

        if (!profileResponse.ok) throw new Error("Failed to fetch profile.");
        const profileData = await profileResponse.json();
        setDbUser(profileData);

        // Fetch notes with same token
        const notesResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/note`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!notesResponse.ok) throw new Error("Failed to fetch notes.");
        const notesData = await notesResponse.json();
        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        logout({
          logoutParams: { returnTo: window.location.origin + "/login" },
        });
      } finally {
        setIsDataLoading(false);
      }
    };

    if (auth0User) {
      fetchData();
    }
  }, [auth0User, getAccessTokenSilently, logout]);

  // Clean logout function
  const handleLogout = () => {
    logout({
      logoutParams: { returnTo: window.location.origin + "/login" },
    });
    toast("Logged out!");
  };

  // Handler for when user details are updated in a child component
  const handleUserUpdate = (updatedUser) => {
    setDbUser(updatedUser);
  };

  // 1. Wait for Auth0 to finish its initial loading
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Authenticating...
      </div>
    );
  }

  // 2. Wait for our own backend data to load
  if (isDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  // 3. If after all that, we still don't have a user, something is wrong.
  if (!dbUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Could not load user data. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section with Profile Info */}
      <div className="flex-grow">
        <div className="relative px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8 mb-8">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full btn-theme p-[3px] shadow-2xl">
                  <div className="w-full h-full backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden card-theme">
                    {dbUser.profilePic ? (
                      <img
                        src={dbUser.profilePic}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-12 h-12 lg:w-16 lg:h-16 text-theme-primary text-primary-accent" />
                    )}
                  </div>
                </div>
                <button
                  onClick={() => navigate("/profile-upload")}
                  className="absolute -bottom-2 -right-2 w-8 h-8 lg:w-10 lg:h-10 btn-theme card-theme shadow-theme rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <Camera className="w-4 h-4 lg:w-5 lg:h-5 text-theme-primary" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="font-[Nunito] text-theme-primary text-primary-accent text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2">
                  {dbUser.fullName}
                </h1>

                <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-6 text-theme-secondary mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm sm:text-base font-medium">
                      {dbUser.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm sm:text-base">
                      Joined{" "}
                      {new Date(dbUser.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl btn-theme card-theme shadow-theme">
                  <FileText className="w-4 h-4 text-theme-primary" />
                  <span className="text-sm font-medium text-theme-primary">
                    {notes.length} {notes.length === 1 ? "Note" : "Notes"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto lg:w-auto">
                <button
                  onClick={() => {
                    if (!toastShown && isDesktop) {
                      toast.success("💡 Tip: Use shift+h for Homepage");
                      localStorage.setItem("toastShownOnce", "true");
                    }
                    navigate("/dashboard");
                  }}
                  className="group relative overflow-hidden btn-theme card-theme text-primary-theme text-theme-accent shadow-theme font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 font-[Nunito] flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="group relative overflow-hidden btn-theme card-theme shadow-theme font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 font-[Nunito] flex items-center justify-center gap-2 text-primary-theme text-theme-accent"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* About Me Section */}
            <div className="mb-8">
              <AboutMeInput user={dbUser} onUpdate={handleUserUpdate} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
