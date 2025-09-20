import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../context/UserContext";
import { Edit, ArrowLeft, Mail, Calendar, MapPin } from "lucide-react";

function ProfilePage() {
  const { user, setUser } = useUser();
  const { getAccessTokenSilently, user: auth0User } = useAuth0();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        // Auth0 token consistency
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE || `${import.meta.env.VITE_BACKEND_URL}`,
          },
        });

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.error("Profile fetch error:", data.error);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    // Agar user context me nahi hai to fetch karo
    if (!user && auth0User) {
      fetchUserProfile();
    } else if (user) {
      setLoading(false);
    }
  }, [user, setUser, getAccessTokenSilently, auth0User]);

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-theme-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-theme-secondary">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-theme-secondary">No user data found</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 btn-theme card-theme shadow-theme px-4 py-2 rounded-xl"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-primary p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-3 card-theme btn-theme shadow-theme rounded-xl hover:scale-110 transition-transform duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <h1 className="text-3xl font-bold font-[satoshi] text-theme-primary">
            My Profile
          </h1>
          
          <button
            onClick={() => navigate("/profile/upload")}
            className="p-3 card-theme btn-theme shadow-theme rounded-xl hover:scale-110 transition-transform duration-300"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="card-theme backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-theme">
          {/* Profile Picture Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-theme-accent shadow-2xl">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = auth0User?.picture || '/default-avatar.png';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {user.fullName?.charAt(0) || user.email?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => navigate("/profile/upload")}
                className="absolute -bottom-2 -right-2 w-10 h-10 btn-theme card-theme shadow-theme rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-theme-primary mt-6 mb-2">
              {user.fullName || "No Name Set"}
            </h2>
            
            <div className="flex items-center justify-center gap-2 text-theme-secondary">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="p-4 card-theme rounded-2xl">
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                About
              </label>
              <p className="text-theme-primary">
                {user.about || "Tell us something about yourself..."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 card-theme rounded-2xl">
                <label className="block text-sm font-medium text-theme-secondary mb-2">
                  Full Name
                </label>
                <p className="text-theme-primary">
                  {user.fullName || "Not set"}
                </p>
              </div>

              <div className="p-4 card-theme rounded-2xl">
                <label className="block text-sm font-medium text-theme-secondary mb-2">
                  Member Since
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-theme-secondary" />
                  <p className="text-theme-primary">
                    {user.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString() 
                      : "Unknown"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate("/profile/edit")}
              className="flex-1 py-3 px-4 btn-theme card-theme shadow-theme rounded-xl font-medium hover:scale-105 transition-transform duration-300"
            >
              Edit Profile
            </button>
            
            <button
              onClick={() => navigate("/profile/upload")}
              className="flex-1 py-3 px-4 border border-theme-accent rounded-xl font-medium transition-all duration-300 hover:bg-theme-accent/10"
            >
              Change Picture
            </button>
          </div>
        </div>

        {/* Stats or Additional Info */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="card-theme p-4 rounded-2xl text-center">
            <div className="text-2xl font-bold text-theme-primary">0</div>
            <div className="text-sm text-theme-secondary">Notes</div>
          </div>
          
          <div className="card-theme p-4 rounded-2xl text-center">
            <div className="text-2xl font-bold text-theme-primary">0</div>
            <div className="text-sm text-theme-secondary">Projects</div>
          </div>
          
          <div className="card-theme p-4 rounded-2xl text-center">
            <div className="text-2xl font-bold text-theme-primary">
              {user.createdAt 
                ? Math.floor((Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))
                : 0
              }
            </div>
            <div className="text-sm text-theme-secondary">Days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;