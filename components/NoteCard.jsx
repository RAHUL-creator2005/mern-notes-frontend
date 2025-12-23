import { useState } from "react";

function NoteCard({ note, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border transform hover:-translate-y-2 hover:rotate-1 relative ${
      note.isLocal
        ? 'border-amber-200 bg-linear-to-br from-amber-50/50 to-orange-50/50'
        : 'border-gray-100 hover:border-blue-200'
    }`}>
      {/* Local note indicator */}
      {note.isLocal && (
        <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md z-10">
          📱 Local
        </div>
      )}

      {/* Subtle gradient overlay on hover */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-500 -z-10 ${
        note.isLocal
          ? 'bg-linear-to-br from-amber-50/0 to-orange-50/0 group-hover:from-amber-50/40 group-hover:to-orange-50/40'
          : 'bg-linear-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30'
      }`}></div>

      <div className="relative flex flex-col h-full">
        {/* Note Title with enhanced styling */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 leading-tight flex-1 group-hover:text-blue-600 transition-colors duration-300">
            {note.title}
          </h3>
          {/* Decorative icon */}
          <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2">
            📌
          </div>
        </div>

        {/* Note Content with better typography */}
        <div className="grow mb-6">
          <p className="text-gray-700 leading-relaxed text-base">
            {isExpanded ? note.content : truncateContent(note.content)}
          </p>

          {note.content.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold mt-3 transition-all duration-200 hover:scale-105 inline-flex items-center gap-1"
            >
              <span>{isExpanded ? '👆 Show less' : '👇 Read more'}</span>
            </button>
          )}
        </div>

        {/* Enhanced Note Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Date with better formatting */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm text-gray-500 font-medium">
              {formatDate(note.createdAt)}
            </span>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(note)}
              className="bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 flex items-center gap-1"
            >
              <span>✏️</span>
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="bg-linear-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 flex items-center gap-1"
            >
              <span>🗑️</span>
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>

        {/* Subtle bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-400 via-purple-500 to-pink-400 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
}

export default NoteCard;
