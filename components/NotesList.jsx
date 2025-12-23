import NoteCard from './NoteCard';

function NotesList({ notes, onEditNote, onDeleteNote, loading }) {
  // If no notes or empty array
  if (!notes || notes.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-lg mx-auto">
          {/* Enhanced empty state with gradient background */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative text-9xl animate-bounce">📝</div>
          </div>

          {/* Enhanced typography */}
          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-4">
            Welcome to Notes!
          </h3>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Your digital notebook awaits. Start capturing your thoughts,
            ideas, and inspirations with beautiful, organized notes.
          </p>

          {/* Enhanced tip box with animation */}
          <div className="bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-100 shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-blue-500 rounded-full p-2 animate-pulse">
                <span className="text-white text-lg">💡</span>
              </div>
            </div>
            <p className="text-gray-700 font-medium">
              <strong>Getting Started:</strong> Use the form above to create your first note.
              Add a title and some content to begin organizing your thoughts!
            </p>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center mt-8 space-x-4">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50/30 via-white to-purple-50/30 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Enhanced section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-linear-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Your Notes Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {notes.length} {notes.length === 1 ? 'beautiful note' : 'wonderful notes'} saved and organized
          </p>

          {/* Stats badge */}
          <div className="inline-flex items-center mt-4 px-4 py-2 bg-linear-to-r from-green-100 to-emerald-100 text-green-800 rounded-full border border-green-200">
            <span className="text-sm font-semibold">✨ {notes.length} Notes</span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading your amazing notes...</p>
          </div>
        )}

        {/* Enhanced notes grid with staggered animation */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {notes.map((note, index) => (
            <div
              key={note._id || note.id}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <NoteCard
                note={note}
                onEdit={onEditNote}
                onDelete={onDeleteNote}
              />
            </div>
          ))}
          </div>
        )}

        {/* Enhanced footer with more personality */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md border border-gray-100">
              <span className="text-2xl animate-pulse">🎯</span>
              <p className="text-gray-700 font-medium">
                Keep creating! You've built an amazing collection of {notes.length} {notes.length === 1 ? 'note' : 'notes'}.
              </p>
            </div>

            {/* Inspirational quote */}
            <div className="mt-6 max-w-md mx-auto">
              <blockquote className="text-gray-500 italic text-sm">
                "The palest ink is better than the best memory."
              </blockquote>
              <cite className="text-gray-400 text-xs mt-1 block">— Chinese Proverb</cite>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default NotesList;
