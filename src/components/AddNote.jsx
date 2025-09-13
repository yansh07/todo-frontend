import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Save, Eye } from "lucide-react";
import {toast} from "react-hot-toast";

const LABEL_COLORS = {
  work: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-l-4 border-cyan-400 shadow-lg shadow-cyan-500/20",
  personal:
    "bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-l-4 border-emerald-400 shadow-lg shadow-emerald-500/20",
  urgent:
    "bg-gradient-to-br from-red-500/20 to-pink-500/20 border-l-4 border-pink-400 shadow-lg shadow-pink-500/20",
  ideas:
    "bg-gradient-to-br from-purple-500/20 to-violet-500/20 border-l-4 border-violet-400 shadow-lg shadow-violet-500/20",
  todo: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-l-4 border-orange-400 shadow-lg shadow-orange-500/20",
  general:
    "bg-gradient-to-br from-gray-500/20 to-slate-500/20 border-l-4 border-slate-400 shadow-lg shadow-slate-500/20",
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

function AddNote() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "general",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveNote = async () => {
      toast.success('Notes added', {
        position: 'top-center', 
        icon: '✅',  
        duration: 3000, 
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',            
        },
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill in both heading and description");
      return;
    }

    setIsSubmitting(true);

    try {
      const noteData = {
        title: formData.title,
        category: formData.category,
        content: formData.content,
      };

      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // login ke baad token store kar raha hoon
        },
        body: JSON.stringify(noteData),
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        throw new Error("Failed to save note");
      }
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen ">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72  rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96  rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80  rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 px-6 py-8 md:px-12 md:py-12 lg:px-20 xl:px-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-3 bg-white/10 btn-theme hover:bg-white/20 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:scale-105 group"
            >
              <ArrowLeft className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
            </button>
            <div>
              <h1 className="font-[satoshi] bg-clip-text font-black text-2xl md:text-3xl lg:text-4xl flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-theme-primary text-primary-accent" />
                Create Magic
              </h1>
              <p className="font-[satoshi] mt-2">
                Transform your thoughts into organized notes
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowPreview(!showPreview)}
            className="hidden md:flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-xl transition-all duration-300 btn-theme"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? "Hide" : "Show"} Preview
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="backdrop-blur-sm  rounded-3xl p-8 shadow-2xl border border-theme shadow-theme">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Heading Input */}
              <div className="space-y-2 form-group-theme">
                <label className="block form-label-theme font-bold font-[satoshi] text-lg">
                  Note Title ✨
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="What's on your mind?"
                  className="w-full px-6 py-4  input-theme rounded-2xl  font-[satoshi] text-lg transition-all duration-300"
                  disabled={isSubmitting}
                />
              </div>

              {/* Label Selection */}
              <div className="space-y-2 form-group-theme">
                <label className="block form-label-theme text-white font-bold font-[satoshi] text-lg">
                  Category 🏷️
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl input-theme font-[satoshi] text-lg transition-all duration-300"
                  disabled={isSubmitting}
                >
                  <option value="general" className="bg-gray-900">
                    📝 General
                  </option>
                  <option value="work" className="bg-gray-900">
                    💼 Work
                  </option>
                  <option value="personal" className="bg-gray-900">
                    🏠 Personal
                  </option>
                  <option value="urgent" className="bg-gray-900">
                    🚨 Urgent
                  </option>
                  <option value="ideas" className="bg-gray-900">
                    💡 Ideas
                  </option>
                  <option value="todo" className="bg-gray-900">
                    ✅ To-Do
                  </option>
                </select>
              </div>

              {/* Description Input */}
              <div className="space-y-2 form-group-theme">
                <label className="block form-label-theme font-bold font-[satoshi] text-lg">
                  Your Thoughts 💭
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Pour your thoughts here... Let your creativity flow!"
                  rows={8}
                  className="w-full px-6 py-4 rounded-2xl input-theme backdrop-blur-sm  resize-none font-[satoshi] text-lg leading-relaxed transition-all duration-300"
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 px-6 py-4  backdrop-blur-sm btn-theme  font-bold rounded-2xl transition-all duration-300 hover:scale-105 font-[satoshi] text-lg"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                onClick={handleSaveNote}
                  type="submit"
                  className="flex-1 px-6 py-4 bg-gradient-to-r btn-theme font-bold rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 font-[satoshi] text-lg flex items-center justify-center gap-2"
                  disabled={
                    isSubmitting ||
                    !formData.title.trim() ||
                    !formData.content.trim()
                  }
                >
                  <Save className="w-5 h-5" />
                  {isSubmitting ? "Saving Magic..." : "Save Note"}
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="backdrop-blur-sm  rounded-3xl p-8 shadow-2xl border border-theme shadow-theme">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 " />
                <h3 className=" font-bold text-xl font-[satoshi] text-theme-primary text-primary-accent">
                  Live Preview
                </h3>
              </div>

              <div
                className={`backdrop-blur-sm rounded-2xl p-6 shadow-2xl transition-all duration-500 ${
                  LABEL_COLORS[formData.category]
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className=" font-bold text-lg font-[satoshi] flex-1 mr-2">
                    {formData.title ||
                      "Your amazing title will appear here..."}
                  </h3>
                  <span className="text-theme-secondary text-xs font-[satoshi]">
                    {formatDate(new Date())}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      LABEL_BADGE_COLORS[formData.category]
                    }`}
                  >
                    {formData.category}
                  </span>
                </div>

                <p className="text-theme-secondary font-[satoshi] leading-relaxed">
                  {formData.content ||
                    "Your thoughts and ideas will be beautifully displayed here. Start typing to see the magic happen!"}
                </p>
              </div>

              {/* Preview Tips */}
              <div className="mt-6 p-4 rounded-xl border border-theme ">
                <h4 className=" font-bold font-[satoshi] mb-2">
                  💡 Preview Tips:
                </h4>
                <ul className="text-theme-secondary text-sm font-[satoshi] space-y-1">
                  <li>• Your note will be automatically timestamped</li>
                  <li>• Colors change based on the category you select</li>
                  <li>• All notes are saved securely to your account</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddNote;
