import { useState } from "react";
import { toast } from 'react-toastify';

function ProfileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      toast.error("Only image files are allowed!");
      return;
    }
    if (f.size > 1024 * 1024) {
      toast.error("File must be under 1MB!");
      return;
    }

    const img = new Image();
    img.onload = () => {
      if (img.width > 300 || img.height > 300) {
        toast.warn("Image should be max 300x300 for best results!");
      }
      setFile(f);
      setPreview(URL.createObjectURL(f));
    };
    img.src = URL.createObjectURL(f);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(import.meta.env.BACKEND_URL + "/api/user/profile-pic", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile picture updated successfully!");
        onUpload(data.user.profilePic);
        setFile(null);
        setPreview(null);
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const clearSelection = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="space-y-6">
      {/* File Input */}
      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-300 text-sm font-medium mb-2 block">
            Choose Profile Picture
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-medium
              file:bg-purple-600 file:text-white
              hover:file:bg-purple-700
              file:cursor-pointer cursor-pointer"
          />
        </label>
        <p className="text-xs text-gray-400">
          Max size: 1MB • Max dimensions: 300x300px • Supported: JPG, PNG, GIF
        </p>
      </div>

      {/* Preview */}
      {preview && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-purple-400"
            />
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={clearSelection}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleSubmit}
        disabled={!file || uploading}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
          !file || uploading
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02]"
        }`}
      >
        {uploading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Uploading...
          </span>
        ) : (
          "Upload Profile Picture"
        )}
      </button>
    </div>
  );
}

export default ProfileUpload;