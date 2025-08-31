import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LABEL_COLORS = {
  work: "bg-blue-500/20 border-blue-400",
  personal: "bg-green-500/20 border-green-400",
  urgent: "bg-red-500/20 border-red-400",
  ideas: "bg-purple-500/20 border-purple-400",
  todo: "bg-yellow-500/20 border-yellow-400",
  general: "bg-gray-500/20 border-gray-400"
};

function AddNote() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    label: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.heading.trim() || !formData.description.trim()) {
      alert("Please fill in both heading and description");
      return;
    }

    setIsSubmitting(true);

    try {
      const noteData = {
        ...formData,
        createdAt: new Date().toISOString(),
        id: Date.now() // temporary ID, replace with MongoDB _id
      };

      // Replace this with your actual API call
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add your auth headers here
        },
        body: JSON.stringify(noteData)
      });

      if (response.ok) {
        // Navigate back to dashboard
        navigate('/dashboard');
      } else {
        throw new Error('Failed to save note');
      }
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-to-tr from-[#060010] to-slate-600 min-h-screen">
      <div className="px-5 py-4 md:px-22 md:py-10 lg:px-44 xl:px-94">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-[satoshi] text-gray-50 font-bold text-2xl md:text-3xl lg:text-4xl">
            Create New Note ✍️
          </h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Heading Input */}
            <div>
              <label className="block text-gray-200 font-semibold mb-2 font-[satoshi]">
                Note Heading *
              </label>
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleInputChange}
                placeholder="Enter note title..."
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-[satoshi]"
                disabled={isSubmitting}
              />
            </div>

            {/* Label Selection */}
            <div>
              <label className="block text-gray-200 font-semibold mb-2 font-[satoshi]">
                Label
              </label>
              <select
                name="label"
                value={formData.label}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 font-[satoshi]"
                disabled={isSubmitting}
              >
                <option value="general" className="bg-gray-800">General</option>
                <option value="work" className="bg-gray-800">Work</option>
                <option value="personal" className="bg-gray-800">Personal</option>
                <option value="urgent" className="bg-gray-800">Urgent</option>
                <option value="ideas" className="bg-gray-800">Ideas</option>
                <option value="todo" className="bg-gray-800">To-Do</option>
              </select>
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-gray-200 font-semibold mb-2 font-[satoshi]">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Write your note content here..."
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none font-[satoshi]"
                disabled={isSubmitting}
              />
            </div>

            {/* Preview Card */}
            <div className="mt-8">
              <h3 className="text-gray-200 font-semibold mb-3 font-[satoshi]">Preview:</h3>
              <div className={`p-4 rounded-lg border-l-4 ${LABEL_COLORS[formData.label]}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-semibold text-lg font-[satoshi]">
                    {formData.heading || "Note Heading"}
                  </h3>
                  <span className="text-xs text-gray-300 font-[satoshi]">
                    {formatDate(new Date())}
                  </span>
                </div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                  formData.label === 'work' ? 'bg-blue-500 text-blue-100' :
                  formData.label === 'personal' ? 'bg-green-500 text-green-100' :
                  formData.label === 'urgent' ? 'bg-red-500 text-red-100' :
                  formData.label === 'ideas' ? 'bg-purple-500 text-purple-100' :
                  formData.label === 'todo' ? 'bg-yellow-500 text-yellow-900' :
                  'bg-gray-500 text-gray-100'
                }`}>
                  {formData.label.charAt(0).toUpperCase() + formData.label.slice(1)}
                </span>
                <p className="text-gray-200 font-[satoshi]">
                  {formData.description || "Your note description will appear here..."}
                </p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-6">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors font-[satoshi]"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 font-[satoshi]"
                disabled={isSubmitting || !formData.heading.trim() || !formData.description.trim()}
              >
                {isSubmitting ? "Saving..." : "Save Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNote;