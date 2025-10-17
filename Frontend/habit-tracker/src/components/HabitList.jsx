import React from "react";

const HabitList = ({ habits, onDelete, onProgress, onEdit }) => {
  if (!habits || habits.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">No habits yet. Add one above!</div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 overflow-hidden">
      {habits.map((h) => (
        <li key={h.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="font-medium text-gray-900">{h.name}</p>
            <p className="text-sm text-gray-600">
              Target: {h.targetPerDay}/day · Today: {h.completedCountToday}
            </p>
            <p className="text-sm text-gray-600">Streak: {h.currentStreak} · Best: {h.longestStreak}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onProgress(h.id)}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-white text-sm hover:bg-emerald-700"
            >
              Mark Progress
            </button>
            <button
              onClick={() => onEdit(h)}
              className="rounded-lg bg-indigo-600 px-3 py-2 text-white text-sm hover:bg-indigo-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(h.id)}
              className="rounded-lg bg-red-600 px-3 py-2 text-white text-sm hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HabitList;


