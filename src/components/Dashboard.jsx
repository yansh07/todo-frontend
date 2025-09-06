import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Edit3, Check, X } from "lucide-react";
import Usernav from "./Usernav";
// import SearchBox from "./Search";
import Footer from "./Footer";

const LABEL_COLORS = {
  work: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-l-4 border-cyan-400 shadow-cyan-500/20",
  personal:
    "bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-l-4 border-emerald-400 shadow-emerald-500/20",
  urgent:
    "bg-gradient-to-br from-red-500/20 to-pink-500/20 border-l-4 border-pink-400 shadow-pink-500/20",
  ideas:
    "bg-gradient-to-br from-purple-500/20 to-violet-500/20 border-l-4 border-violet-400 shadow-violet-500/20",
  todo: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-l-4 border-orange-400 shadow-orange-500/20",
  general:
    "bg-gradient-to-br from-gray-500/20 to-slate-500/20 border-l-4 border-slate-400 shadow-slate-500/20",
};

const LABEL_BADGE_COLORS = {
  work: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30",
  personal:
    "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/30",
  urgent:
    "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30",
  ideas:
    "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/30",
  todo: "bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 shadow-lg shadow-yellow-500/30",
  general:
    "bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg shadow-gray-500/30",
};

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null); // jis note ko edit karna hai
  const [editContent, setEditContent] = useState("");

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.error("Profile fetch error:", data.error);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
    fetchNotes(); // 👈 automatically load notes
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/note", {
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
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/note/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setNotes(notes.filter((note) => note._id !== noteId));
      } else {
        throw new Error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    }
  };
  // Edit start
  const startEdit = (note) => {
    setEditingNote(note._id);
    setEditContent(note.content);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingNote(null);
    setEditContent("");
  };

  // Save edit
  const saveEdit = async (noteId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/note/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (response.ok) {
        const updatedNote = await response.json();
        setNotes(notes.map((n) => (n._id.toString() === noteId.toString() ? updatedNote : n)));
        cancelEdit();
      } else {
        throw new Error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user) return <p className="text-white">Loading...</p>;

 return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 ">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <Usernav />

        <div className="px-6 py-8 md:px-12 md:py-12 lg:px-20 xl:px-56">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-2 lg:mb-0">
              <h1 className="font-[satoshi] text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4">
                Welcome back, {user.fullName} 👋
              </h1>
              <p className="text-gray-300 text-lg font-[satoshi]">
                Ready to capture your thoughts and ideas?
              </p>
            </div>
            {/* <SearchBox /> */}
          </div>

          {/* Add Note Button */}
          {notes.length === 0 && (
            <div className="flex justify-center mb-12 xl:mb-2 ml-0 xl:ml-18">
              <button
                onClick={() => navigate("/add-note")}
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold py-4 px-8  rounded-2xl shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 font-[satoshi]"
              >
                <div className="flex items-center gap-3">
                  <Plus className="w-6 h-6" />
                  <span className="text-lg">Create New Note</span>
                </div>
                {/* Shine effect */}
                <div className="absolute inset-0 -top-full bg-gradient-to-b from-transparent via-white/20 to-transparent group-hover:top-full transition-all duration-1000"></div>
              </button>
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="px-6 md:px-12 lg:px-20 xl:px-32 xl:ml-20 pb-12 mb-4">
          {loading ? (
            <div className="flex justify-center items-center py-20 xl:py-0 ml-12 xl:-ml-8">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                <p className="text-gray-300 text-lg font-[satoshi] mt-4 text-center lg:-ml-8 md:-ml-10 -ml-10 xl:-ml-10 ">
                  Loading your notes...
                </p>
              </div>
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-2">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-6">
                  <Plus className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-[satoshi]">
                  Your canvas is empty
                </h3>
                <p className="text-gray-400 text-lg mb-8 font-[satoshi] max-w-md mx-auto">
                  Start your journey by creating your first note. Every great
                  idea begins with a single thought.
                </p>
              </div>
              <button
                onClick={() => navigate("/add-note")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 font-[satoshi]"
              >
                Create Your First Note
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {notes.map((note) => (
                <div
                  key={note._id || note.id}
                  className={`group relative backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                    LABEL_COLORS[note.category]
                  }`}
                >
                  {/* Note Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-white font-bold text-lg font-[satoshi] flex-1 mr-2 line-clamp-2">
                      {note.title}
                    </h3>
                    {/* Responsive button visibility - visible on smaller screens, hover on xl */}
                    <div className="flex gap-2 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-300">
                      {editingNote === note._id ? (
                        <>
                          <button
                            onClick={() => saveEdit(note._id)}
                            className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
                            title="Save changes"
                          >
                            <Check className="w-4 h-4 text-green-300 hover:text-green-200" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-2 bg-gray-500/20 hover:bg-gray-500/30 rounded-lg transition-colors"
                            title="Cancel edit"
                          >
                            <X className="w-4 h-4 text-gray-300 hover:text-gray-200" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(note)}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                            title="Edit note"
                          >
                            <Edit3 className="w-4 h-4 text-gray-300 hover:text-white" />
                          </button>
                          <button
                            onClick={() => deleteNote(note._id || note.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                            title="Delete note"
                          >
                            <Trash2 className="w-4 h-4 text-red-300 hover:text-red-200" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Label Badge */}
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        LABEL_BADGE_COLORS[note.category] ||
                        LABEL_BADGE_COLORS.general
                      }`}
                    >
                      {note.category || note.label || "general"}
                    </span>
                    <span className="text-gray-400 text-xs font-[satoshi]">
                      {note.updatedAt
                        ? formatDate(note.updatedAt)
                        : note.createdAt
                        ? formatDate(note.createdAt)
                        : "No date"}
                    </span>
                  </div>

                  {/* Description */}
                  {editingNote === note._id ? (
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full bg-white/10 text-gray-200 font-[satoshi] leading-relaxed p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={4}
                      autoFocus
                    />
                  ) : (
                    <p className="text-gray-200 font-[satoshi] leading-relaxed line-clamp-4">
                      {note.content}
                    </p>
                  )}

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;