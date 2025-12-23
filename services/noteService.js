// API service for notes operations
const API_BASE_URL = 'http://localhost:5000/api';

class NoteService {
  // Get all notes
  static async getAllNotes() {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`);

      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw new Error('Failed to load notes. Please check if the backend server is running.');
    }
  }

  // Get single note by ID
  static async getNoteById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Note not found');
        }
        throw new Error(`Failed to fetch note: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching note:', error);
      throw error;
    }
  }

  // Create new note
  static async createNote(noteData) {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create note: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw new Error('Failed to create note. Please try again.');
    }
  }

  // Update note by ID
  static async updateNote(id, noteData) {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Note not found');
        }
        throw new Error(`Failed to update note: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating note:', error);
      throw new Error('Failed to update note. Please try again.');
    }
  }

  // Delete note by ID
  static async deleteNote(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Note not found');
        }
        throw new Error(`Failed to delete note: ${response.status} ${response.statusText}`);
      }

      return { success: true, message: 'Note deleted successfully' };
    } catch (error) {
      console.error('Error deleting note:', error);
      throw new Error('Failed to delete note. Please try again.');
    }
  }
}

export default NoteService;
