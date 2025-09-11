import React, { useState, useEffect } from "react";

function AboutMeInput({ user, onUpdate }) {
  const [about, setAbout] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState(null);

  useEffect(() => {
    if (user?.about) {
      setAbout(user.about);
    }
  }, [user]);

  const saveAbout = async (aboutText) => {
    if (aboutText === user?.bio) return; // 🔥 FIX: Compare with bio field

    console.log("💾 Saving about text:", aboutText); // Debug log
    console.log("🔍 Current user bio:", user?.bio); // Debug log

    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");
      console.log("🔑 Token exists:", !!token); // Debug log
      
      const requestBody = { about: aboutText };
      console.log("📤 Sending request body:", requestBody); // Debug log
      
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log("📡 Response status:", response.status); // Debug log

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("✅ Updated user received:", updatedUser); // Debug log
        if (onUpdate) {
          onUpdate(updatedUser); // Update parent component's user state
        }
      } else {
        const errorData = await response.json();
        console.error("❌ Response error:", errorData); // Debug log
        throw new Error("Failed to save bio");
      }
    } catch (error) {
      console.error("❌ Error saving bio:", error);
      // Could add toast notification here
    } finally {
      setIsSaving(false);
    }
  };

  const handleAboutChange = (e) => {
    const newAbout = e.target.value.slice(0, 150);
    setAbout(newAbout);

    // Clear existing timeout
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    // Set new timeout to save after user stops typing for 1 second
    const timeout = setTimeout(() => {
      saveAbout(newAbout);
    }, 1000);

    setSaveTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
    };
  }, [saveTimeout]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <textarea
          value={about}
          onChange={handleAboutChange}
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
        {isSaving && (
          <div className="absolute top-2 right-2">
            <div className="w-4 h-4 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-1">
        <div className="text-xs text-gray-500">
          {isSaving ? (
            <span className="text-purple-400">Saving...</span>
          ) : (
            <span>Auto-saved</span>
          )}
        </div>
        <div className="text-xs text-gray-400">
          {about.length}/150
        </div>
      </div>
    </div>
  );
}

export default AboutMeInput;