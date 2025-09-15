import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function AboutMeInput({ user, onUpdate }) {
  const [about, setAbout] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState(null);
  
  const { getAccessTokenSilently, user: auth0User } = useAuth0();

  useEffect(() => {
    if (user?.about) {
      setAbout(user.about);
    }
  }, [user]);

  const saveAbout = async (aboutText) => {
    if (aboutText === user?.about) return; 

    console.log("💾 Saving about text:", aboutText);
    console.log("🔍 Current user bio:", user?.about);

    try {
      setIsSaving(true);
      
      // Get Auth0 token
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE || `${import.meta.env.VITE_BACKEND_URL}`,
        },
      });

      console.log("🔑 Token received, length:", token.length);
      
      const requestBody = { 
        about: aboutText,
        auth0Id: auth0User.sub,
        email: auth0User.email,
      };
      console.log("📤 Sending request body:", requestBody);
      
      // Use verify-user endpoint with about field update
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log("📡 Response status:", response.status);

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("✅ Updated user received:", updatedUser);
        if (onUpdate) {
          onUpdate(updatedUser);
        }
      } else {
        const errorData = await response.json();
        console.error("❌ Response error:", errorData);
        throw new Error("Failed to save bio");
      }
    } catch (error) {
      console.error("❌ Error saving bio:", error);
      // Reset to original value on error
      setAbout(user?.about || "");
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
          rows={about ? 3 : 1}
          placeholder="✨ Write something about yourself..."
          className="
            w-full px-4 py-2 
            text-sm italic 
            rounded-xl border-theme shadow-theme input-theme text-primary-theme text-theme-accent
            transition-all text-primary-theme text-primary-accent backdrop:blur-3xl duration-300 
            resize-none overflow-hidden
          "
        />
        {isSaving && (
          <div className="absolute top-2 right-2">
            <div className="w-4 h-4 border-2 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-1">
        <div className="text-xs ">
          {isSaving ? (
            <span className="">Saving...</span>
          ) : (
            <span>Auto-saved</span>
          )}
        </div>
        <div className="text-xs ">
          {about.length}/150
        </div>
      </div>
    </div>
  );
}

export default AboutMeInput;