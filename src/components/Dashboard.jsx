import React, { useState } from "react";
import Usernav from "./Usernav";
import SearchBox from "./Search";

function Dashboard() {
  const userName = "Priyanshu"; // will fetch user's name from db
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

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
      </div>
      {/* notes section */}
      <div className="mt-8 px-10 md:px-40 lg:px-76 xl:px-96 xl:ml-16">
        {notes.length === 0 ? (
          <p className="text-gray-300 italic text-lg font-[satoshi] xl:text-2xl">
            You don’t have any notes yet. Start by adding one! 📝
          </p>
        ) : (
          <ul className="space-y-3">
            {notes.map((note, index) => (
              <li
                key={index}
                className="bg-white/10 text-white p-3 rounded-lg shadow-md"
              >
                {note}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Add Note Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newNote.trim()) return;
            setNotes([...notes, newNote]);
            setNewNote("");
          }}
          className="mt-12 md:mt-16 md:m-14  px-6 lg:px-12 lg:ml-28 flex gap-3"
        >
          <input
            type="text"
            placeholder="Write a new note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow"
          >
            Add
          </button>
        </form>
    </div>
  );
}

export default Dashboard;
