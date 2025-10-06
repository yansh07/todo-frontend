import React, { useEffect } from 'react';
import { X, Edit3, Trash2, Calendar, Tag } from 'lucide-react';

const LABEL_BADGE_COLORS = {
  work: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30",
  personal: "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/30",
  urgent: "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30",
  ideas: "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/30",
  todo: "bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 shadow-lg shadow-yellow-500/30",
  general: "bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg shadow-gray-500/30",
};

const NoteModal = ({ note, isOpen, onClose, onEdit, onDelete }) => {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEdit = () => {
    onEdit(note);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDelete(note._id);
      onClose();
    }
  };

  if (!isOpen || !note) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Content */}
        <div className="card-theme backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-theme-accent/20">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-theme-primary font-[Nunito] mb-3 break-words">
                  {note.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      LABEL_BADGE_COLORS[note.category] || LABEL_BADGE_COLORS.general
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    {note.category || 'general'}
                  </span>
                  
                  <div className="flex items-center gap-1 text-theme-secondary text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {note.updatedAt ? formatDate(note.updatedAt) : formatDate(note.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleEdit}
                  className="p-3 hover:bg-theme-secondary/20 rounded-xl transition-all duration-300 hover:scale-110"
                  title="Edit note"
                >
                  <Edit3 className="w-5 h-5 text-theme-primary" />
                </button>
                
                <button
                  onClick={handleDelete}
                  className="p-3 hover:bg-red-500/20 rounded-xl transition-all duration-300 hover:scale-110"
                  title="Delete note"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
                
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-theme-secondary/20 rounded-xl transition-all duration-300 hover:scale-110"
                  title="Close (ESC)"
                >
                  <X className="w-5 h-5 text-theme-primary" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="prose prose-lg max-w-none">
              <div className="text-theme-primary font-[Nunito] leading-relaxed whitespace-pre-wrap text-base md:text-lg">
                {note.content}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-theme-accent/20 bg-theme-secondary/5">
            <div className="flex items-center justify-between text-sm text-theme-secondary">
              <div>
                Created: {formatDate(note.createdAt)}
              </div>
              {note.updatedAt && note.updatedAt !== note.createdAt && (
                <div>
                  Last modified: {formatDate(note.updatedAt)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;