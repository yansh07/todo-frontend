// import React, { useState, useEffect } from "react";
// import { User, Plus } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import AddNote from "./AddNote";
// import AboutMeInput from "./Aboutme";
// import Footer from "./Footer";
// import { toast } from 'react-toastify';
// import { useUser } from "../context/UserContext";
// // import dotenv from "dotenv";

// function Profile() {
//   const [notes, setNotes] = useState([]);
//   const { user, setUser } = useUser();
//   const [loading, setLoading] = useState(!user);
//   const notify = () => toast("Logged out!");
//   const navigate = useNavigate();

//   // Token validation helper
//   const handleAuthError = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     toast.error("Session expired. Please login again.");
//     navigate("/login");
//   };

//   // 📌 Handle user update from AboutMe component
//   const handleUserUpdate = (updatedUser) => {
//     console.log("🔄 Updating user in Profile:", updatedUser); // Debug log
//     setUser(updatedUser);
//   };

//   useEffect(() => {
//     const fetchProfile = async() => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
        
//         if (!token) {
//           navigate("/login");
//           return;
//         }

//         console.log("🔍 Fetching profile from Profile.jsx"); // Debug log
//         const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/profile", {
//           headers: {Authorization: `Bearer ${token}`},
//         });
        
//         if (res.status === 401) {
//           handleAuthError();
//           return;
//         }
        
//         const data = await res.json();
//         console.log("👤 Fetched user data in Profile:", data); // Debug log
//         if (res.ok) {
//           setUser(data);
//         } else {
//           console.error("Profile fetch error:", data.error);
//           if (data.error?.includes("token")) {
//             handleAuthError();
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         handleAuthError();
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!user) {
//       fetchProfile();
//     } else {
//       setLoading(false);
//     }
    
//     fetchNotes();
//   }, [user, setUser, navigate]);

//   const fetchNotes = async () => {
//     try {
//       const token = localStorage.getItem("token");
      
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/note", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 401) {
//         handleAuthError();
//         return;
//       }

//       if (response.ok) {
//         const fetchedNotes = await response.json();
//         setNotes(fetchedNotes);
//       } else {
//         const errorData = await response.json();
//         if (errorData.error?.includes("token")) {
//           handleAuthError();
//         } else {
//           throw new Error("Failed to fetch notes");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//       // Don't redirect on network errors, only on auth errors
//     }
//   };

//   if (loading || !user) return <p className="text-white">Loading...</p>;

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen  flex flex-col">
//       <div className="flex flex-row gap-10 px-8 py-8 md:px-38 lg:px-72 xl:px-125 xl:mt-4">
//         <div className="w-20 h-20 md:w-20 md:h-20 rounded-full btn-theme p-[2px] cursor-pointer group-hover:scale-110 transition-transform duration-300">
//           <div className="w-full h-full  backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden">
//             {user.profilePic ? (
//               <img 
//                 src={user.profilePic} 
//                 alt="Profile" 
//                 className="w-full h-full object-cover rounded-full"
//               />
//             ) : (
//               <User className="w-10 h-10 text-theme-primary text-primary-accent" />
//             )}
//           </div>
//         </div>
//         <div>
//           <h1 className="font-[satoshi] text-theme-primary text-primary-accent bg-clip-text  text-4xl mt-2 md:text-4xl lg:text-5xl xl:text-6xl">
//             {user.fullName}
//           </h1>
//           <span className="text-md font-[satoshi] text-theme-primary text-primary-accent bg-clip-text font-medium">
//             {user.email}
//           </span>
//           <br></br>
//           <span className="text-sm font-[satoshi] text-theme-secondary">
//             Joined on: {new Date(user.createdAt).toLocaleDateString()}
//           </span>
//         </div>
//       </div>
//       <div className="px-8 mb-6">
//         {/* 📌 Pass user and onUpdate props to AboutMeInput */}
//         <AboutMeInput user={user} onUpdate={handleUserUpdate} />
//       </div>
//       <div className="font-[satoshi] font-medium  px-8 md:px-40 lg:px-72 xl:px-125">
//         <div className="flex flex-row gap-8 md:gap-36 xl:gap-46">
//           <div className="flex justify-center">
//             <button
//               onClick={() => navigate("/profile-upload")}
//               className="group relative overflow-hidden btn-theme font-bold py-2 px-3 md:px-7 md:py-2 xl:px-3 xl:py-3 rounded-2xl shadow-2xl transition-all duration-300 card-theme shadow-theme font-[satoshi]"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-md">Add Picture</span>
//               </div>
//               <div className="absolute inset-0 -top-full group-hover:top-full transition-all duration-1000"></div>
//             </button>
//           </div>
//           <div className="flex justify-center ml-12">
//             <button
//               onClick={() => navigate("/dashboard")}
//               className=" group relative overflow-hidden btn-theme card-theme shadow-theme font-bold py-3 px-6 md:px-7 md:py-2 xl:px-3 xl:py-3 rounded-2xl shadow-2xl transition-all duration-300  font-[satoshi]"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-md">Home</span>
//               </div>
//               <div className="absolute inset-0 -top-full group-hover:top-full transition-all duration-1000"></div>
//             </button>
//           </div>
//         </div>
//         <div className="flex flex-row gap-12 md:gap-40 xl:gap-54">
//           <h2 className="px-3 py-3 xl:py-3 xl:px-3  md:px-8 md:py-2  rounded-2xl btn-theme card-theme shadow-theme text-md font-semibold mt-6 shadow-2xl transition-all duration-300 ">
//           Total notes: {notes.length}
//         </h2>
//         <button onClick={() => { handleLogout(); notify();}} className="px-5 py-3 xl:py-3 xl:px-5   md:px-4 md:py-2  rounded-2xl btn-theme card-theme shadow-theme text-md font-semibold mt-6 shadow-2xl  transition-all duration-300  ">
//           Logout
//         </button>
//         </div>
//       </div>
//       <div className="flex-1 px-8 py-6 md:px-40 md:mt-4 lg:px-72 xl:px-125">
//         <h2 className="text-xl font-medium  text-theme-primary text-primary-accent mb-4 lg:text-3xl lg:font-semibold">
//           Latest Notes
//         </h2>

//         {notes.length > 0 ? (
//           <div className="grid gap-4 md:grid-cols-2">
//             {notes.slice(0, 3).map((note) => (
//               <div
//                 key={note._id}
//                 className="p-4 rounded-xl border-theme backdrop-blur-sm border card-theme transition"
//               >
//                 <h3 className="text-lg font-semibold ">
//                   {note.title}
//                 </h3>
//                 <p className=" text-sm line-clamp-3">
//                   {note.content}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-theme-primary text-primary-accent italic">
//             🎨 Your canvas is empty — start by adding a new note!
//           </p>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Profile;
import React, { useState, useEffect } from "react";
import { User, Plus, Calendar, Mail, Home, LogOut, Camera, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";
import AboutMeInput from "./Aboutme";
import Footer from "./Footer";
import { toast } from 'react-toastify';
import { useUser } from "../context/UserContext";

function Profile() {
  const [notes, setNotes] = useState([]);
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(!user);
  const notify = () => toast("Logged out!");
  const navigate = useNavigate();

  // Token validation helper
  const handleAuthError = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.error("Session expired. Please login again.");
    navigate("/login");
  };

  // 📌 Handle user update from AboutMe component
  const handleUserUpdate = (updatedUser) => {
    console.log("🔄 Updating user in Profile:", updatedUser);
    setUser(updatedUser);
  };

  useEffect(() => {
    const fetchProfile = async() => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          navigate("/login");
          return;
        }

        console.log("🔍 Fetching profile from Profile.jsx");
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/profile", {
          headers: {Authorization: `Bearer ${token}`},
        });
        
        if (res.status === 401) {
          handleAuthError();
          return;
        }
        
        const data = await res.json();
        console.log("👤 Fetched user data in Profile:", data);
        if (res.ok) {
          setUser(data);
        } else {
          console.error("Profile fetch error:", data.error);
          if (data.error?.includes("token")) {
            handleAuthError();
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        handleAuthError();
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
    
    fetchNotes();
  }, [user, setUser, navigate]);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/note", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (response.ok) {
        const fetchedNotes = await response.json();
        setNotes(fetchedNotes);
      } else {
        const errorData = await response.json();
        if (errorData.error?.includes("token")) {
          handleAuthError();
        } else {
          throw new Error("Failed to fetch notes");
        }
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  if (loading || !user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-theme-primary text-primary-accent text-xl">Loading...</div>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section with Profile Info */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8 mb-8">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full btn-theme p-[3px] shadow-2xl">
                <div className="w-full h-full backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden card-theme">
                  {user.profilePic ? (
                    <img 
                      src={user.profilePic} 
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
              <h1 className="font-[satoshi] text-theme-primary text-primary-accent text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2">
                {user.fullName}
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-6 text-theme-secondary mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm sm:text-base font-medium">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm sm:text-base">
                    Joined {new Date(user.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>

              {/* Stats Card */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl btn-theme card-theme shadow-theme">
                <FileText className="w-4 h-4 text-theme-primary" />
                <span className="text-sm font-medium text-theme-primary">
                  {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto lg:w-auto">
              <button
                onClick={() => navigate("/dashboard")}
                className="group relative overflow-hidden btn-theme card-theme shadow-theme font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 font-[satoshi] flex items-center justify-center gap-2 text-theme-primary text-primary-accent"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              
              <button
                onClick={() => { handleLogout(); notify(); }}
                className="group relative overflow-hidden btn-theme card-theme shadow-theme font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 font-[satoshi] flex items-center justify-center gap-2 text-theme-primary text-primary-accent"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* About Me Section */}
          <div className="mb-8">
            <AboutMeInput user={user} onUpdate={handleUserUpdate} />
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-theme-primary text-primary-accent font-[satoshi]">
              Latest Notes
            </h2>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-theme-secondary hover:text-theme-primary transition-colors text-sm font-medium"
            >
              View All →
            </button>
          </div>

          {notes.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {notes.slice(0, 6).map((note) => (
                <div
                  key={note._id}
                  className="group p-6 rounded-2xl border-theme backdrop-blur-sm border card-theme transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-theme-primary group-hover:text-primary-accent transition-colors font-[satoshi] line-clamp-1">
                      {note.title}
                    </h3>
                    <div className="w-2 h-2 rounded-full bg-theme-primary opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-2"></div>
                  </div>
                  <p className="text-theme-secondary text-sm line-clamp-3 leading-relaxed">
                    {note.content}
                  </p>
                  <div className="mt-4 pt-3 border-t border-theme-secondary/20">
                    <span className="text-xs text-theme-secondary">
                      {new Date(note.createdAt || note.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full btn-theme card-theme flex items-center justify-center">
                <FileText className="w-10 h-10 text-theme-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-theme-primary mb-2 font-[satoshi]">
                No notes yet
              </h3>
              <p className="text-theme-secondary mb-6 max-w-md mx-auto">
                Your canvas is empty — start by creating your first note and bring your ideas to life!
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center gap-2 px-6 py-3 btn-theme card-theme shadow-theme rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                Create Your First Note
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;