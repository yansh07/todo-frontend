import React, { useState, useEffect, useRef } from "react";
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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false); // New state for mobile search overlay

  // Reference for the desktop search input for autoFocus
  const desktopSearchInputRef = useRef(null);

  // Single useEffect to handle all data loading
  useEffect(() => {
    const setupDashboard = async () => {
      if (!isAuthenticated || !auth0User) {
        setLoading(false); // Important: stop loading if not authenticated
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience:
              import.meta.env.VITE_AUTH0_AUDIENCE ||
              `${import.meta.env.VITE_BACKEND_URL}`,
          },
        });

        // Step 1: Verify user with backend
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
          throw new Error(`User verification failed: ${userResponse.status}`);
        }

        const userData = await userResponse.json();
        setDbUser(userData);

        // Step 2: Fetch notes
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
          throw new Error(`Failed to fetch notes: ${notesResponse.status}`);
        }

        const notesData = await notesResponse.json();
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
          note.content.toLowerCase().includes(searchTerm.toLowerCase()) || // Search content too
          note.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [searchTerm, notes]);

  const deleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
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
        const { note: updatedNote } = await response.json();
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n._id === noteId ? updatedNote : n))
        );
        cancelEdit();
      } else {
        throw new Error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleMobileSearchToggle = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (isMobileSearchOpen) {
      setSearchTerm(""); // Clear search when closing
    }
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
    const firstName = dbuser.fullName.split(" ")[0]; // Get first name
    if (hour >= 5 && hour < 12) {
      return `Morning, ${firstName}`;
    } else if (hour >= 12 && hour < 18) {
      return `What's good this Afternoon, ${firstName}?`;
    } else if (hour >= 18 && hour < 22) {
      return `How was your day, ${firstName}?`;
    } else {
      return `Catch some rest, ${firstName}`;
    }
  };

  // Loading and Error States
  if (isLoading) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <div className="text-theme-primary text-center p-8">
          <div className="animate-spin w-8 h-8 border-2 border-theme-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg font-[satoshi]">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <div className="text-theme-primary text-center p-8">
          <p className="text-lg font-[satoshi]">Please log in to continue.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <div className="text-theme-primary text-center p-8">
          <div className="animate-spin w-8 h-8 border-2 border-theme-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg font-[satoshi]">Loading your data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <div className="text-theme-primary text-center p-8">
          <p className="text-lg font-[satoshi] mb-4">
            Error loading data: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-[satoshi] hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dbuser) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <div className="text-theme-primary text-center p-8">
          <p className="text-lg font-[satoshi]">
            Error loading profile. Please try logging in again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-primary relative">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 rounded-full blur-3xl animate-pulse opacity-20 bg-cyan-400"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl animate-pulse delay-700 opacity-20 bg-pink-400"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-80 sm:h-80 rounded-full blur-3xl animate-pulse delay-1000 opacity-20 bg-violet-400"></div>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden flex justify-center items-start pt-16 px-4">
          <div className="w-full max-w-md card-theme rounded-2xl p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-5 h-5 text-theme-primary" />
              <input
                type="text"
                placeholder="Search by title, category, or content..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-1 bg-transparent text-theme-primary text-base sm:text-lg font-[satoshi] placeholder-theme-secondary outline-none"
                autoFocus
              />
              {/* Floating Search Button (Mobile only) */}
              {/* <button
                onClick={handleMobileSearchToggle}
                className="fixed bottom-6 right-6 md:hidden w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors z-50"
              >
                <Search className="w-6 h-6 text-white" />
              </button> */}
            </div>
            {searchTerm && (
              <div className="text-sm text-theme-secondary font-[satoshi]">
                {filteredNotes.length} result
                {filteredNotes.length !== 1 ? "s" : ""} found
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative z-10">
        <Usernav />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Header Section */}
          <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 sm:mb-12">
            <div className="mb-4 lg:mb-0">
              <h1 className="font-[satoshi] font-medium text-theme-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-4">
                {getGreeting()} 👋
              </h1>
              <p className="text-theme-secondary text-base sm:text-lg font-[satoshi]">
                Ready to capture your thoughts and ideas?
              </p>
            </div>

            {/* Desktop Action Bar: Search & Add Note */}
            <div className="hidden md:flex items-center gap-4">
              {notes.length > 0 && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-secondary" />
                  <input
                    ref={desktopSearchInputRef}
                    type="text"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-64 lg:w-72 card-theme backdrop-blur-sm border border-theme-accent rounded-xl py-3 pl-10 pr-4 transition-all duration-300 font-[satoshi] text-theme-primary placeholder-theme-secondary focus:ring-2 focus:ring-theme-accent focus:border-transparent"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-theme-secondary hover:bg-theme-secondary/10 transition-colors"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
              <button
                onClick={() => navigate("/add-note")}
                className="group relative overflow-hidden font-bold py-3 px-5 btn-theme rounded-xl shadow-lg transition-all duration-300 hover:scale-105 font-[satoshi] text-sm flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Note</span>
              </button>
            </div>
          </header>

          {/* Search Results Info (visible for both mobile and desktop) */}
          {searchTerm && (notes.length > 0 || isMobileSearchOpen) && (
            <div className="mb-6 px-2">
              <p className="text-theme-secondary font-[satoshi] text-sm sm:text-base">
                Found {filteredNotes.length} result
                {filteredNotes.length !== 1 ? "s" : ""} for "
                <span className="font-medium text-theme-primary">
                  {searchTerm}
                </span>
                "
              </p>
            </div>
          )}

          {/* Notes Content */}
          {notes.length === 0 ? (
            /* Empty State */
            <div className="text-center py-8 sm:py-12">
              <div className="mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto card-theme rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Plus className="w-8 h-8 sm:w-12 sm:h-12 text-theme-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-theme-primary mb-3 sm:mb-4 font-[satoshi]">
                  Your canvas is empty
                </h3>
                <p className="text-theme-secondary text-base sm:text-lg mb-6 sm:mb-8 font-[satoshi] max-w-md mx-auto">
                  Start your journey by creating your first note. Every great
                  idea begins with a single thought.
                </p>
              </div>
              <button
                onClick={() => navigate("/add-note")}
                className="group relative overflow-hidden font-bold py-3 sm:py-4 px-6 sm:px-8 btn-theme rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 font-[satoshi] text-sm sm:text-base"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Create Your First Note</span>
                </div>
              </button>
            </div>
          ) : filteredNotes.length === 0 && searchTerm ? (
            /* No Search Results */
            <div className="text-center py-8 sm:py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto card-theme rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-theme-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-theme-primary mb-3 sm:mb-4 font-[satoshi]">
                No notes found
              </h3>
              <p className="text-theme-secondary font-[satoshi] max-w-md mx-auto mb-4">
                Try searching with different keywords or clear the search.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="text-theme-accent font-[satoshi] underline hover:text-theme-primary transition-colors"
              >
                Clear search
              </button>
            </div>
          ) : (
            /* Notes Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredNotes.map((note) => (
                <article
                  key={note._id || note.id}
                  className={`group relative backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                    LABEL_COLORS[note.category]
                  }`}
                >
                  {/* Note Header */}
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <h3 className="text-theme-primary font-bold text-base sm:text-lg font-[satoshi] flex-1 mr-2 line-clamp-2">
                      {note.title}
                    </h3>
                    {/* Action Buttons */}
                    <div className="flex gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                      {editingNote === note._id ? (
                        <>
                          <button
                            onClick={() => saveEdit(note._id)}
                            className="p-1.5 sm:p-2 hover:bg-theme-secondary/20 rounded-lg transition-colors"
                            title="Save changes"
                          >
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-1.5 sm:p-2 hover:bg-theme-secondary/20 rounded-lg transition-colors"
                            title="Cancel edit"
                          >
                            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(note)}
                            className="p-1.5 sm:p-2 hover:bg-theme-secondary/20 rounded-lg transition-colors"
                            title="Edit note"
                          >
                            <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-theme-primary" />
                          </button>
                          <button
                            onClick={() => deleteNote(note._id || note.id)}
                            className="p-1.5 sm:p-2 hover:bg-theme-secondary/20 rounded-lg transition-colors"
                            title="Delete note"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Label and Date */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4">
                    <span
                      className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit ${
                        LABEL_BADGE_COLORS[note.category] ||
                        LABEL_BADGE_COLORS.general
                      }`}
                    >
                      {note.category || note.label || "general"}
                    </span>
                    <span className="text-theme-secondary text-xs font-[satoshi]">
                      {note.updatedAt
                        ? formatDate(note.updatedAt)
                        : note.createdAt
                        ? formatDate(note.createdAt)
                        : "No date"}
                    </span>
                  </div>

                  {/* Content */}
                  {editingNote === note._id ? (
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full bg-theme-secondary/20 text-theme-primary font-[satoshi] leading-relaxed p-2 sm:p-3 rounded-lg resize-none border border-theme-accent/30 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-theme-accent/50"
                      rows={4}
                      autoFocus
                    />
                  ) : (
                    <p className="text-theme-primary font-[satoshi] leading-relaxed line-clamp-4 text-sm sm:text-base">
                      {note.content}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}

          {/* Mobile Floating Action Button (FAB) */}
          {/* This FAB handles both Add Note and toggling Search */}
          <button
            onClick={
              isMobileSearchOpen
                ? handleMobileSearchToggle // If search is open, close it
                : notes.length > 0 // If notes exist, toggle search. Else, add note
                ? handleMobileSearchToggle
                : () => navigate("/add-note")
            }
            className="md:hidden fixed bottom-6 right-6 z-40 p-3 sm:p-4 rounded-full btn-theme shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label={
              isMobileSearchOpen
                ? "Close search"
                : notes.length > 0
                ? "Search notes"
                : "Add new note"
            }
          >
            {isMobileSearchOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            ) : notes.length > 0 ? (
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            ) : (
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            )}
          </button>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
