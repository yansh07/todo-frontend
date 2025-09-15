import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Edit3, Check, X, Search } from "lucide-react";
import Usernav from "./Usernav";
import Footer from "./Footer";
import ThemeToggle from "./Themetoggle";
import { useAuth0 } from "@auth0/auth0-react";

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
  const [dbuser, setDbUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [error, setError] = useState(null);
  const {
    user: auth0User,
    getAccessTokenSilently,
    isLoading,
    isAuthenticated,
  } = useAuth0();

  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Single useEffect to handle all data loading
  useEffect(() => {
    const setupDashboard = async () => {
      if (!isAuthenticated || !auth0User) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log("Getting access token...");
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience:
              import.meta.env.VITE_AUTH0_AUDIENCE ||
              `${import.meta.env.VITE_BACKEND_URL}`,
          },
        });

        console.log("Token received, length:", token.length);

        // Step 1: Verify user with backend
        console.log("Verifying user...");
        const userResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/verify-user`,
          {
            method: "POST",
            credentials: "include",
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

        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          console.error("User verification failed:", errorText);
          throw new Error(`User verification failed: ${userResponse.status}`);
        }

        const userData = await userResponse.json();
        console.log("User verified:", userData);
        setDbUser(userData);

        // Step 2: Fetch notes
        console.log("Fetching notes...");
        const notesResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/note`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!notesResponse.ok) {
          const errorText = await notesResponse.text();
          console.error("Notes fetch failed:", errorText);
          throw new Error(`Failed to fetch notes: ${notesResponse.status}`);
        }

        const notesData = await notesResponse.json();
        console.log("Notes fetched:", notesData);
        setNotes(notesData);
        setFilteredNotes(notesData);
      } catch (error) {
        console.error("Error setting up dashboard:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!isLoading && isAuthenticated) {
      setupDashboard();
    }
  }, [auth0User, getAccessTokenSilently, isLoading, isAuthenticated]);

  // Filter notes when search term or notes change
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [searchTerm, notes]);

  const deleteNote = async (noteId) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/note/${noteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== noteId)
        );
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
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/note/${noteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: editContent }),
        }
      );

      if (response.ok) {
        const {note: updatedNote} = await response.json();
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n._id === noteId ? updatedNote : n))
        );
        cancelEdit();
      } else {
        throw new Error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Search handlers
  const handleSearchClick = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchClose = () => {
    setIsSearchExpanded(false);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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

  const getGreeting = () => {
    if (!dbuser?.fullName) return "Welcome!";

    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return `Morning, ${dbuser.fullName}`;
    } else if (hour >= 12 && hour < 18) {
      return `What's good this Afternoon, ${dbuser.fullName}?`;
    } else if (hour >= 18 && hour < 22) {
      return `How was your day, ${dbuser.fullName}?`;
    } else {
      return `Catch some rest, ${dbuser.fullName}`;
    }
  };

  // Loading states
  if (isLoading) {
    return <div className="text-white text-center p-10">Authenticating...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="text-white text-center p-10">
        Please log in to continue.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-white text-center p-10">Loading your data...</div>
    );
  }

  if (error) {
    return (
      <div className="text-white text-center p-10">
        <p>Error loading data: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!dbuser) {
    return (
      <div className="text-white text-center p-10">
        Error loading profile. Please try logging in again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary bg-theme-primary ">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72  rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96  rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80  rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Search Overlay for Mobile */}
      {isSearchExpanded && (
        <div className="fixed inset-0  backdrop-blur-sm z-50 md:hidden">
          <div className="flex items-start justify-center pt-20 px-4">
            <div className="w-full max-w-md  backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title or category..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="flex-1  text-lg font-[satoshi]"
                  autoFocus
                />
                <button
                  onClick={handleSearchClose}
                  className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 " />
                </button>
              </div>
              {searchTerm && (
                <div className="text-sm  font-[satoshi]">
                  {filteredNotes.length} result
                  {filteredNotes.length !== 1 ? "s" : ""} found
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10">
        <Usernav />

        <div className="px-6 py-4 md:px-12 md:py-12 lg:px-16 xl:px-36">
          {/* Header Section with Search */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-2 lg:mb-0">
              <h1 className="font-[satoshi] font-medium text-theme-primary text-theme-accent bg-clip-text text-3xl md:text-4xl lg:text-4xl xl:text-4xl mb-4">
                {getGreeting()} 👋
              </h1>
              <p className=" text-lg font-[satoshi] text-theme-primary text-theme-accent">
                Ready to capture your thoughts and ideas?
              </p>
            </div>

            {/* Desktop Search */}
            {notes.length > 0 && (
              <div className="hidden md:block mt-4 lg:mt-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 " />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-64 lg:w-72  backdrop-blur-sm border border-theme border-theme-accent rounded-xl py-3 pl-10 pr-4 transition-all duration-300 font-[satoshi]"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full btn-theme input-theme shadow-theme"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Search Icon */}
            {notes.length > 0 && (
              <div className="md:hidden fixed bottom-6 right-6 z-40">
                <button
                  onClick={handleSearchClick}
                  className=" p-4 rounded-full shadow-2xl btn-theme input-theme shadow-theme transition-all duration-300"
                >
                  <Search className="w-6 h-6 text-white" />
                </button>
              </div>
            )}
          </div>

          {/* Search Results Info */}
          {searchTerm && (
            <div className="mt-6 mb-4">
              <p className=" font-[satoshi]">
                Found {filteredNotes.length} result
                {filteredNotes.length !== 1 ? "s" : ""} for "{searchTerm}"
              </p>
            </div>
          )}

          {/* Add Note Button */}
          {notes.length === 0 && (
            <div className="flex justify-center mb-12 xl:mb-2 ml-0 xl:ml-18">
              <button
                onClick={() => navigate("/add-note")}
                className="group relative overflow-hidden font-bold py-4 px-8  rounded-2xl shadow-2xl btn-theme transition-all duration-300  font-[satoshi]"
              >
                <div className="flex items-center gap-3">
                  <Plus className="w-6 h-6" />
                  <span className="text-lg">Create New Note</span>
                </div>
                {/* Shine effect */}
                <div className="absolute inset-0 -top-full glow transition-all duration-1000"></div>
              </button>
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="px-6 md:px-12 lg:px-20 xl:px-32 xl:ml-20 pb-12 mb-4">
          {notes.length === 0 ? (
            <div className="text-center py-2">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6">
                  <Plus className="w-12 h-12 " />
                </div>
                <h3 className="text-2xl font-bold  mb-4 font-[satoshi]">
                  Your canvas is empty
                </h3>
                <p className=" text-lg mb-8 font-[satoshi] max-w-md mx-auto">
                  Start your journey by creating your first note. Every great
                  idea begins with a single thought.
                </p>
              </div>
              <button
                onClick={() => navigate("/add-note")}
                className="font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 font-[satoshi]"
              >
                Create Your First Note
              </button>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 " />
              </div>
              <h3 className="text-xl font-bold  mb-4 font-[satoshi]">
                No notes found
              </h3>
              <p className=" font-[satoshi] max-w-md mx-auto">
                Try searching with different keywords or create a new note.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4  font-[satoshi] underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNotes.map((note) => (
                <div
                  key={note._id || note.id}
                  className={`group relative backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                    LABEL_COLORS[note.category]
                  }`}
                >
                  {/* Note Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className=" font-bold text-lg font-[satoshi] flex-1 mr-2 line-clamp-2">
                      {note.title}
                    </h3>
                    {/* Responsive button visibility - visible on smaller screens, hover on xl */}
                    <div className="flex gap-2 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-300">
                      {editingNote === note._id ? (
                        <>
                          <button
                            onClick={() => saveEdit(note._id)}
                            className="p-2  rounded-lg transition-colors"
                            title="Save changes"
                          >
                            <Check className="w-4 h-4 " />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-2 rounded-lg transition-colors"
                            title="Cancel edit"
                          >
                            <X className="w-4 h-4 " />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(note)}
                            className="p-2  rounded-lg transition-colors"
                            title="Edit note"
                          >
                            <Edit3 className="w-4 h-4 " />
                          </button>
                          <button
                            onClick={() => deleteNote(note._id || note.id)}
                            className="p-2 rounded-lg transition-colors"
                            title="Delete note"
                          >
                            <Trash2 className="w-4 h-4 " />
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
                    <span className=" text-xs font-[satoshi]">
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
                      className="w-full  font-[satoshi] leading-relaxed p-2 rounded-lg resize-none "
                      rows={4}
                      autoFocus
                    />
                  ) : (
                    <p className=" font-[satoshi] leading-relaxed line-clamp-4">
                      {note.content}
                    </p>
                  )}

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none"></div>
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
