import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Usernav from "./Usernav";
import SearchBox from "./Search";

const LABEL_COLORS = {
  work: "bg-blue-500/20 border-blue-400",
  personal: "bg-green-500/20 border-green-400",
  urgent: "bg-red-500/20 border-red-400",
  ideas: "bg-purple-500/20 border-purple-400",
  todo: "bg-yellow-500/20 border-yellow-400",
  general: "bg-gray-500/20 border-gray-400"
};

const LABEL_BADGE_COLORS = {
  work: "bg-blue-500 text-blue-100",
  personal: "bg-green-500 text-green-100",
  urgent: "bg-red-500 text-red-100",
  ideas: "bg-purple-500 text-purple-100",
  todo: "bg-yellow-500 text-yellow-900",
  general: "bg-gray-500 text-gray-100"
};

function Dashboard() {
  const navigate = useNavigate();
  const userName = "Priyanshu"; // will fetch user's name from db
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notes from MongoDB on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('/api/notes', {
        headers: {
          // Add your auth headers here
        }
      });
      
      if (response.ok) {
        const fetchedNotes = await response.json();
        setNotes(fetchedNotes);
      } else {
        throw new Error('Failed to fetch notes');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      // You might want to show an error toast here
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          // Add your auth headers here
        }
      });

      if (response.ok) {
        setNotes(notes.filter(note => note._id !== noteId));
      } else {
        throw new Error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-to-tr from-[#060010] to-slate-600 min-h-screen">
      <Usernav />
      <div className="px-5 py-4 md:px-22 md:py-10 lg:px-26 xl:px-32">
        {/* container holding name and search box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 className="font-[satoshi] text-gray-50 font-bold text-2xl md:text-3xl lg:text-4xl xl:text-4xl mb-4 sm:mb-0 sm:mr-4 lg:px-16 xl:-ml-5">
            Hi {userName} 👋
          </h1>
          <SearchBox />
        </div>

        {/* Add Note Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => navigate('/add-note')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-colors font-[satoshi] flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add New Note
          </button>
        </div>
      </div>

      {/* notes section */}
      <div className="mt-8 px-6 md:px-12 lg:px-20 xl:px-32">
        {loading ? (
          <div className="flex justify-center">
            <p className="text-gray-300 text-lg font-[satoshi]">Loading your notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-300 italic text-lg font-[satoshi] xl:text-2xl mb-6">
              You don't have any notes yet. Start by adding one! 📝
            </p>
            <button
              onClick={() => navigate('/add-note')}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-colors font-[satoshi]"
            >
              Create Your First Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id || note.id}
                className={`p-5 rounded-lg border-l-4 shadow-lg hover:shadow-xl transition-shadow ${LABEL_COLORS[note.label]}`}
              >
                {/* Note Header */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-white font-bold text-lg font-[satoshi] flex-1 mr-2">
                    {note.heading}
                  </h3>
                  <button
                    onClick={() => deleteNote(note._id || note.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors p-1"
                    title="Delete note"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {/* Label Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${LABEL_BADGE_COLORS[note.label]}`}>
                  {note.label.charAt(0).toUpperCase() + note.label.slice(1)}
                </span>

                {/* Description */}
                <p className="text-gray-200 mb-4 font-[satoshi] leading-relaxed">
                  {note.description}
                </p>

                {/* Date */}
                <p className="text-gray-400 text-sm font-[satoshi]">
                  {formatDate(note.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;