import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileUpload from "../components/ProfileUpload";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleProfilePicUpdate = (newProfilePic) => {
    setUser(prev => ({ ...prev, profilePic: newProfilePic }));
    // Optional: Navigate back to profile after successful upload
    setTimeout(() => {
      navigate("/profile");
    }, 1500);
  };

  if (!user) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8 flex flex-col items-center">
      <div className="max-w-md w-full bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
        <button
          onClick={() => navigate("/profile")}
          className="mb-6 text-purple-300 hover:text-purple-200 text-sm"
        >
          ← Back to Profile
        </button>
        
        <h1 className="text-3xl font-bold text-white mb-8 text-center font-[satoshi]">
          Update Profile Picture
        </h1>
        
        <div className="mb-8 flex justify-center">
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-400"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center border-4 border-gray-500">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
        </div>
        
        <ProfileUpload onUpload={handleProfilePicUpdate} />
      </div>
    </div>
  );
}

export default ProfilePage;