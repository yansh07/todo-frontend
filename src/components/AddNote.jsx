// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const LABEL_COLORS = {
//   work: "bg-blue-500/20 border-blue-400",
//   personal: "bg-green-500/20 border-green-400",
//   urgent: "bg-red-500/20 border-red-400",
//   ideas: "bg-purple-500/20 border-purple-400",
//   todo: "bg-yellow-500/20 border-yellow-400",
//   general: "bg-gray-500/20 border-gray-400"
// };

// function AddNote() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     heading: "",
//     description: "",
//     label: "general"
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.heading.trim() || !formData.description.trim()) {
//       alert("Please fill in both heading and description");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const noteData = {
//         ...formData,
//         createdAt: new Date().toISOString(),
//         id: Date.now() // temporary ID, replace with MongoDB _id
//       };

//       // Replace this with your actual API call
//       const response = await fetch('/api/notes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add your auth headers here
//         },
//         body: JSON.stringify(noteData)
//       });

//       if (response.ok) {
//         // Navigate back to dashboard
//         navigate('/dashboard');
//       } else {
//         throw new Error('Failed to save note');
//       }
//     } catch (error) {
//       console.error('Error saving note:', error);
//       alert('Failed to save note. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="bg-gradient-to-tr from-[#060010] to-slate-600 min-h-screen">
//       <div className="px-5 py-4 md:px-22 md:py-10 lg:px-44 xl:px-94">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="font-[satoshi] text-gray-50 font-bold text-2xl md:text-3xl lg:text-4xl">
//             Create New Note ✍️
//           </h1>
//           <button
//             onClick={() => navigate('/dashboard')}
//             className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
//           >
//             Back to Dashboard
//           </button>
//         </div>

//         {/* Form Container */}
//         <div className="max-w-2xl mx-auto">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Heading Input */}
//             <div>
//               <label className="block text-gray-200 font-semibold mb-2 font-[satoshi]">
//                 Note Heading *
//               </label>
//               <input
//                 type="text"
//                 name="heading"
//                 value={formData.heading}
//                 onChange={handleInputChange}
//                 placeholder="Enter note title..."
//                 className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-[satoshi]"
//                 disabled={isSubmitting}
//               />
//             </div>

//             {/* Label Selection */}
//             <div>
//               <label className="block text-gray-200 font-semibold mb-2 font-[satoshi]">
//                 Label
//               </label>
//               <select
//                 name="label"
//                 value={formData.label}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 font-[satoshi]"
//                 disabled={isSubmitting}
//               >
//                 <option value="general" className="bg-gray-800">General</option>
//                 <option value="work" className="bg-gray-800">Work</option>
//                 <option value="personal" className="bg-gray-800">Personal</option>
//                 <option value="urgent" className="bg-gray-800">Urgent</option>
//                 <option value="ideas" className="bg-gray-800">Ideas</option>
//                 <option value="todo" className="bg-gray-800">To-Do</option>
//               </select>
//             </div>

//             {/* Description Input */}
//             <div>
//               <label className="block text-gray-200 font-semibold mb-2 font-[satoshi]">
//                 Description *
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 placeholder="Write your note content here..."
//                 rows={6}
//                 className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none font-[satoshi]"
//                 disabled={isSubmitting}
//               />
//             </div>

//             {/* Preview Card */}
//             <div className="mt-8">
//               <h3 className="text-gray-200 font-semibold mb-3 font-[satoshi]">Preview:</h3>
//               <div className={`p-4 rounded-lg border-l-4 ${LABEL_COLORS[formData.label]}`}>
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-white font-semibold text-lg font-[satoshi]">
//                     {formData.heading || "Note Heading"}
//                   </h3>
//                   <span className="text-xs text-gray-300 font-[satoshi]">
//                     {formatDate(new Date())}
//                   </span>
//                 </div>
//                 <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${
//                   formData.label === 'work' ? 'bg-blue-500 text-blue-100' :
//                   formData.label === 'personal' ? 'bg-green-500 text-green-100' :
//                   formData.label === 'urgent' ? 'bg-red-500 text-red-100' :
//                   formData.label === 'ideas' ? 'bg-purple-500 text-purple-100' :
//                   formData.label === 'todo' ? 'bg-yellow-500 text-yellow-900' :
//                   'bg-gray-500 text-gray-100'
//                 }`}>
//                   {formData.label.charAt(0).toUpperCase() + formData.label.slice(1)}
//                 </span>
//                 <p className="text-gray-200 font-[satoshi]">
//                   {formData.description || "Your note description will appear here..."}
//                 </p>
//               </div>
//             </div>

//             {/* Submit Buttons */}
//             <div className="flex gap-3 pt-6">
//               <button
//                 type="button"
//                 onClick={() => navigate('/dashboard')}
//                 className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors font-[satoshi]"
//                 disabled={isSubmitting}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 font-[satoshi]"
//                 disabled={isSubmitting || !formData.heading.trim() || !formData.description.trim()}
//               >
//                 {isSubmitting ? "Saving..." : "Save Note"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddNote;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Save, Eye } from "lucide-react";

const LABEL_COLORS = {
  work: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-l-4 border-cyan-400 shadow-lg shadow-cyan-500/20",
  personal: "bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-l-4 border-emerald-400 shadow-lg shadow-emerald-500/20",
  urgent: "bg-gradient-to-br from-red-500/20 to-pink-500/20 border-l-4 border-pink-400 shadow-lg shadow-pink-500/20",
  ideas: "bg-gradient-to-br from-purple-500/20 to-violet-500/20 border-l-4 border-violet-400 shadow-lg shadow-violet-500/20",
  todo: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-l-4 border-orange-400 shadow-lg shadow-orange-500/20",
  general: "bg-gradient-to-br from-gray-500/20 to-slate-500/20 border-l-4 border-slate-400 shadow-lg shadow-slate-500/20"
};

const LABEL_BADGE_COLORS = {
  work: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30",
  personal: "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/30",
  urgent: "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30",
  ideas: "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/30",
  todo: "bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 shadow-lg shadow-yellow-500/30",
  general: "bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg shadow-gray-500/30"
};

function AddNote() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    label: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

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
        id: Date.now()
      };

      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData)
      });

      if (response.ok) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 px-6 py-8 md:px-12 md:py-12 lg:px-20 xl:px-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:scale-105 group"
            >
              <ArrowLeft className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
            </button>
            <div>
              <h1 className="font-[satoshi] text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text font-black text-2xl md:text-3xl lg:text-4xl flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-purple-400" />
                Create Magic
              </h1>
              <p className="text-gray-400 font-[satoshi] mt-2">Transform your thoughts into organized notes</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 text-gray-300 hover:text-white"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Hide' : 'Show'} Preview
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 shadow-2xl border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Heading Input */}
              <div className="space-y-2">
                <label className="block text-white font-bold font-[satoshi] text-lg">
                  Note Title ✨
                </label>
                <input
                  type="text"
                  name="heading"
                  value={formData.heading}
                  onChange={handleInputChange}
                  placeholder="What's on your mind?"
                  className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/15 font-[satoshi] text-lg transition-all duration-300"
                  disabled={isSubmitting}
                />
              </div>

              {/* Label Selection */}
              <div className="space-y-2">
                <label className="block text-white font-bold font-[satoshi] text-lg">
                  Category 🏷️
                </label>
                <select
                  name="label"
                  value={formData.label}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/15 font-[satoshi] text-lg transition-all duration-300"
                  disabled={isSubmitting}
                >
                  <option value="general" className="bg-gray-900">📝 General</option>
                  <option value="work" className="bg-gray-900">💼 Work</option>
                  <option value="personal" className="bg-gray-900">🏠 Personal</option>
                  <option value="urgent" className="bg-gray-900">🚨 Urgent</option>
                  <option value="ideas" className="bg-gray-900">💡 Ideas</option>
                  <option value="todo" className="bg-gray-900">✅ To-Do</option>
                </select>
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label className="block text-white font-bold font-[satoshi] text-lg">
                  Your Thoughts 💭
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Pour your thoughts here... Let your creativity flow!"
                  rows={8}
                  className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/15 resize-none font-[satoshi] text-lg leading-relaxed transition-all duration-300"
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 font-[satoshi] text-lg"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 disabled:opacity-50 font-[satoshi] text-lg flex items-center justify-center gap-2"
                  disabled={isSubmitting || !formData.heading.trim() || !formData.description.trim()}
                >
                  <Save className="w-5 h-5" />
                  {isSubmitting ? "Saving Magic..." : "Save Note"}
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 shadow-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-purple-400" />
                <h3 className="text-white font-bold text-xl font-[satoshi]">Live Preview</h3>
              </div>
              
              <div className={`backdrop-blur-sm rounded-2xl p-6 shadow-2xl transition-all duration-500 ${LABEL_COLORS[formData.label]}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-white font-bold text-lg font-[satoshi] flex-1 mr-2">
                    {formData.heading || "Your amazing title will appear here..."}
                  </h3>
                  <span className="text-gray-400 text-xs font-[satoshi]">
                    {formatDate(new Date())}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${LABEL_BADGE_COLORS[formData.label]}`}>
                    {formData.label}
                  </span>
                </div>

                <p className="text-gray-200 font-[satoshi] leading-relaxed">
                  {formData.description || "Your thoughts and ideas will be beautifully displayed here. Start typing to see the magic happen!"}
                </p>
              </div>
              
              {/* Preview Tips */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                <h4 className="text-purple-300 font-bold font-[satoshi] mb-2">💡 Preview Tips:</h4>
                <ul className="text-gray-400 text-sm font-[satoshi] space-y-1">
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