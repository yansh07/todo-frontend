import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { Camera, Upload, X, Check, ArrowLeft, ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProfileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const { getAccessTokenSilently, user: auth0User } = useAuth0();
  const navigate = useNavigate();

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Only image files are allowed!");
      return;
    }
    if (selectedFile.size > 1024 * 1024) {
      toast.error("File must be under 1MB!");
      return;
    }

    const img = new Image();
    img.onload = () => {
      if (img.width > 300 || img.height > 300) {
        toast.warn("Image should be max 300x300 for best results!");
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    };
    img.src = URL.createObjectURL(selectedFile);
  };

  const handleInputChange = (e) => {
    handleFileChange(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    setUploading(true);

    try {
      console.log("🔍 Starting upload process...");
      console.log("📄 File details:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience:
            import.meta.env.VITE_AUTH0_AUDIENCE ||
            `${import.meta.env.VITE_BACKEND_URL}`,
        },
      });

      console.log("🔑 Token obtained:", token ? "✅ Yes" : "❌ No");

      const formData = new FormData();
      formData.append("profilePic", file);

      // Debug: Check formData contents
      console.log("📦 FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(
          `  ${key}:`,
          value instanceof File ? `File(${value.name})` : value
        );
      }

      const uploadUrl = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/user/profile-pic`;
      console.log("🌐 Upload URL:", uploadUrl);

      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      console.log("📡 Response status:", res.status);
      console.log("📡 Response ok:", res.ok);

      const data = await res.json();
      console.log("📊 Response data:", data);

      if (res.ok && data.success) {
        console.log("✅ Upload successful!");
        console.log(
          "🖼️ New profile pic URL:",
          data.user?.profilePic || data.profilePic
        );

        toast.success("Profile picture updated successfully!");

        // Call onUpload with the correct URL
        const newProfilePicUrl = data.user?.profilePic || data.profilePic;
        if (onUpload && newProfilePicUrl) {
          console.log("🔄 Calling onUpload with:", newProfilePicUrl);
          onUpload(newProfilePicUrl);
        }

        setTimeout(() => navigate("/profile"), 1500);
      } else {
        console.error("❌ Upload failed:", data);
        toast.error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("💥 Upload error:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  const clearSelection = () => {
    setFile(null);
    setPreview(null);
    if (preview) URL.revokeObjectURL(preview);
  };

  return (
    <div className="min-h-screen bg-theme-primary flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/profile")}
            className="absolute -top-2 -left-2 p-3 card-theme btn-theme shadow-theme rounded-xl hover:scale-110 transition-transform duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 mx-auto mb-4 card-theme btn-theme shadow-theme rounded-2xl flex items-center justify-center">
            <Camera className="w-8 h-8 text-theme-primary" />
          </div>

          <h1 className="text-3xl font-bold font-[Nunito] text-theme-primary bg-clip-text mb-2">
            Update Profile Picture
          </h1>
          <p className="text-theme-secondary">
            Upload a new photo to personalize your profile
          </p>
        </div>

        {/* Upload Area */}
        <div className="card-theme backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-theme">
          {!preview ? (
            // Upload Zone
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
                ${
                  dragOver
                    ? "border-purple-400 bg-purple-400/10 scale-105"
                    : "border-theme-accent hover:border-purple-400/50 hover:bg-purple-400/5"
                }
              `}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />

              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto btn-theme card-theme shadow-theme rounded-2xl flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-theme-primary" />
                </div>

                <div>
                  <p className="text-lg font-semibold text-theme-primary mb-2">
                    {dragOver
                      ? "Drop your image here"
                      : "Choose or drag your photo"}
                  </p>
                  <p className="text-sm text-theme-secondary">
                    Max 1MB • 300x300px recommended
                  </p>
                </div>

                <label htmlFor="file-upload" className="inline-block">
                  <div className="btn-theme card-theme shadow-theme px-6 py-3 rounded-xl font-medium cursor-pointer hover:scale-105 transition-transform duration-300">
                    <Upload className="w-4 h-4 inline mr-2" />
                    Browse Files
                  </div>
                </label>
              </div>
            </div>
          ) : (
            // Preview Zone
            <div className="space-y-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-theme-accent shadow-2xl">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={clearSelection}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="mt-4 text-theme-primary font-medium">
                  Looking great! Ready to upload?
                </p>
                <p className="text-sm text-theme-secondary">
                  {file?.name} • {(file?.size / 1024).toFixed(1)}KB
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={clearSelection}
                  className="flex-1 py-3 px-4 border border-theme-accent rounded-xl font-medium transition-all duration-300 hover:bg-theme-accent/10"
                >
                  Choose Different
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={uploading}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    uploading
                      ? "cursor-not-allowed opacity-50"
                      : "btn-theme card-theme shadow-theme hover:scale-105 text-theme-primary"
                  }`}
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-theme-primary border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      Upload Photo
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Guidelines */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-4 px-4 py-2 card-theme rounded-xl text-xs text-theme-secondary">
            <span>✓ JPG, PNG, GIF</span>
            <span>✓ Max 1MB</span>
            <span>✓ Square format preferred</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpload;
