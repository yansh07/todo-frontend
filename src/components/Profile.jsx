import React, { useState, useEffect } from "react";
import { User, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";
import AboutMeInput from "./Aboutme";
import Footer from "./Footer";
import { toast } from 'react-toastify';


function Profile() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState([]);
  // const [loading, setLoading] = useState(true);
  const notify = () => toast("Logged out!");
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProfile = async() => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: {Authorization: `Bearer ${token}`},
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.error("Profile fetch error:", data.error);
        }
      } catch (err) {
        console.error("Error fetching error:", err);
      }
    };
    fetchProfile();
    fetchNotes();
  }, []);
  const fetchNotes = async () => {
    try {
      // setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/note", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const fetchedNotes = await response.json();
        setNotes(fetchedNotes);
      } else {
        throw new Error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  if (!user) return <p className="text-white">Loading...</p>;

  const handleLogout = () => {
    localStorage.removeItem("token"); // JWT delete
    navigate("/login");               // redirect to login
  };

  
  return (
    // profile card
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900  flex flex-col">
      <div className="flex flex-row gap-10 px-8 py-8 md:px-38 lg:px-72 xl:px-145 xl:mt-4">
        <div className="w-20 h-20 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 p-[2px] cursor-pointer group-hover:scale-110 transition-transform duration-300">
          <div className="w-full h-full bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
        </div>
        <div>
          <h1 className="font-[satoshi] text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text font-black text-4xl mt-2 md:text-4xl lg:text-5xl xl:text-6xl">
            {user.fullName}
          </h1>
          <span className="text-md font-[satoshi] text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text font-medium">
            {user.email}
          </span>
          <br></br>
          <span className="text-sm font-[satoshi] text-gray-300">
            Joined on: {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="px-8 mb-6">
        <AboutMeInput />
      </div>
      <div className="font-[satoshi] font-medium  px-8 md:px-40 lg:px-72 xl:px-145">
        <div className="flex flex-row gap-8 md:gap-36 xl:gap-46">
          {/* Add Note Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/add-note")}
              className="group relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold py-3 px-3 md:px-7 md:py-2 xl:px-3 xl:py-3 rounded-2xl shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 font-[satoshi]"
            >
              <div className="flex items-center gap-2">
                {/* <Plus className="w-6 h-6" /> */}
                <span className="text-md">Add Picture</span>
              </div>
              {/* Shine effect */}
              <div className="absolute inset-0 -top-full bg-gradient-to-b from-transparent via-white/20 to-transparent group-hover:top-full transition-all duration-1000"></div>
            </button>
          </div>
          <div className="flex justify-center ml-6">
            <button
              onClick={() => navigate("/add-note")}
              className=" group relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold py-3 px-6 md:px-7 md:py-2 xl:px-3 xl:py-3 rounded-2xl shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 font-[satoshi]"
            >
              <div className="flex items-center gap-2">
                {/* <Plus className="w-6 h-6" /> */}
                <span className="text-md">New Note</span>
              </div>
              {/* Shine effect */}
              <div className="absolute inset-0 -top-full bg-gradient-to-b from-transparent via-white/20 to-transparent group-hover:top-full transition-all duration-1000"></div>
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-12 md:gap-40 xl:gap-54">
          <h2 className="px-3 py-3 xl:py-3 xl:px-3  md:px-8 md:py-2  rounded-2xl border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white text-md font-semibold mt-6 shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50">
          Total notes: {4}
        </h2>
        <button onClick={() => { handleLogout(); notify();}} className="px-8 py-3 xl:py-3 xl:px-3   md:px-8 md:py-2  rounded-2xl border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white text-md font-semibold mt-6 shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50">
          Logout
        </button>
        </div>
      </div>
      {/*Notes Preview Section */}
      <div className="flex-1 px-8 py-6 md:px-40 md:mt-4 lg:px-72 xl:px-145">
        <h2 className="text-xl font-medium  text-gray-100 mb-4 lg:text-3xl lg:font-semibold">
          Latest Notes
        </h2>

        {notes.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {notes.slice(0, 3).map((note) => (
              <div
                key={note.id}
                className="p-4 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700 hover:border-purple-400 transition"
              >
                <h3 className="text-lg font-semibold text-purple-200">
                  {note.title}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-3">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">
            🎨 Your canvas is empty — start by adding a new note!
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
