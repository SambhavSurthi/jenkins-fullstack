import React from "react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">H</span>
          <span className="text-xl font-semibold text-gray-800">Habit Tracker</span>
        </div>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-gray-700">GitHub</a>
      </div>
    </header>
  );
};

export default Navbar;


