import React, { useState } from "react";

function AboutMeInput() {
  const [about, setAbout] = useState("");

  return (
    <div className="w-full max-w-md mx-auto">
      <textarea
        value={about}
        onChange={(e) => setAbout(e.target.value.slice(0, 150))} // limit ~150 chars (2–3 lines)
        rows={about ? 3 : 1} //unfold when user types/clicks
        placeholder="✨ Write something about yourself..."
        className="
          w-full px-4 py-2 
          text-sm text-gray-200 
          placeholder-gray-500 italic 
          bg-gray-800/60 
          rounded-xl border border-gray-700 
          focus:border-purple-400 focus:ring-2 focus:ring-purple-400/60 
          transition-all backdrop:blur-3xl duration-300 
          resize-none overflow-hidden
        "
      />
      <div className="text-xs text-gray-400 mt-1 text-right">
        {about.length}/150
      </div>
    </div>
  );
}

export default AboutMeInput;
