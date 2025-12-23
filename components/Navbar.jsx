import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📝</span>
          <div>
            <h1 className="text-xl font-bold">NoteKeeper</h1>
          </div>
        </div>
        <div className="text-sm text-gray-300">
          NoteKeeper
          Digital Notebook
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
  