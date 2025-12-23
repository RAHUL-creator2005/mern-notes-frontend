import { useState, useEffect } from "react";

const AddNote = ({ onAddNote, editingNote, onUpdateNote, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form when editingNote changes
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || '');
      setContent(editingNote.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingNote) {
        await onUpdateNote(editingNote._id, { title: title.trim(), content: content.trim() });
      } else {
        await onAddNote({ title: title.trim(), content: content.trim() });
      }

      // Reset form only on successful submission
      if (!editingNote) {
        setTitle('');
        setContent('');
      }
    } catch (error) {
      // Error is already handled by the parent component
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    onCancelEdit();
  };

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
        {/* Decorative background gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-pink-100 to-orange-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

        <div className="relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <span className="text-2xl text-white">✨</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create New Note</h2>
            <p className="text-gray-600">Share your thoughts and ideas with the world</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span className="text-blue-500">📝</span>
                Note Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your note a catchy title..."
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 focus:bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span className="text-purple-500">📖</span>
                Note Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thoughts, ideas, or reminders here..."
                rows="6"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all duration-300 resize-none text-gray-900 placeholder-gray-400 text-lg bg-gray-50 focus:bg-white leading-relaxed"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-linear-to-r from-blue-500 via-purple-600 to-blue-600 hover:from-blue-600 hover:via-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-8 rounded-2xl font-bold text-xl transition-all duration-500 shadow-xl hover:shadow-2xl disabled:shadow-none transform hover:-translate-y-1 hover:scale-105 disabled:transform-none disabled:scale-100 flex items-center justify-center gap-3 group relative overflow-hidden disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>{editingNote ? 'Saving...' : 'Creating...'}</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl group-hover:animate-bounce">🚀</span>
                    <span>{editingNote ? '💾 Save Changes' : '✨ Create Note'}</span>
                    <span className="text-2xl group-hover:animate-bounce">✨</span>
                  </>
                )}
              </button>

              {editingNote && (
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white py-4 px-8 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:-translate-y-1 disabled:transform-none flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  <span>❌</span>
                  <span>Cancel</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
