import React, { useState } from "react";

const HabitForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [targetPerDay, setTargetPerDay] = useState(8);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), targetPerDay: Math.max(1, Number(targetPerDay)) });
    setName("");
    setTargetPerDay(8);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="block text-sm text-gray-600">Habit name</label>
        <input
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Drink water"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600">Times per day</label>
        <input
          type="number"
          min="1"
          className="mt-1 w-28 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={targetPerDay}
          onChange={(e) => setTargetPerDay(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="h-10 rounded-lg bg-blue-600 px-4 text-white font-medium hover:bg-blue-700 active:bg-blue-800"
      >
        Add Habit
      </button>
    </form>
  );
};

export default HabitForm;


