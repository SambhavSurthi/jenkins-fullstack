import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import QuoteBanner from "../components/QuoteBanner";
import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";
import { createHabit, deleteHabit, getHabits, markProgress, updateHabit } from "../api";

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    getHabits()
      .then((res) => setHabits(res.data))
      .catch(() => setError("Failed to load habits"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (payload) => {
    await createHabit(payload);
    load();
  };

  const handleDelete = async (id) => {
    await deleteHabit(id);
    load();
  };

  const handleProgress = async (id) => {
    await markProgress(id);
    load();
  };

  const handleEdit = (habit) => setEditing(habit);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editing) return;
    await updateHabit(editing.id, { name: editing.name, targetPerDay: editing.targetPerDay });
    setEditing(null);
    load();
  };

  const totals = useMemo(() => {
    const count = habits.length;
    const totalStreak = habits.reduce((s, h) => s + (h.currentStreak || 0), 0);
    return { count, totalStreak };
  }, [habits]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        <QuoteBanner />

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl bg-white p-4 shadow border border-gray-100">
            <p className="text-sm text-gray-500">Habits</p>
            <p className="text-2xl font-semibold">{totals.count}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow border border-gray-100">
            <p className="text-sm text-gray-500">Total Streak</p>
            <p className="text-2xl font-semibold">{totals.totalStreak}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow border border-gray-100">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-2xl font-semibold">{new Date().toLocaleDateString()}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Add a habit</h2>
          <HabitForm onSubmit={handleAdd} />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Your habits</h2>
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <HabitList habits={habits} onDelete={handleDelete} onProgress={handleProgress} onEdit={handleEdit} />
          )}
        </section>

        {editing && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">Edit habit</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col sm:flex-row gap-3 sm:items-end">
              <div className="flex-1">
                <label className="block text-sm text-gray-600">Habit name</label>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Times per day</label>
                <input
                  type="number"
                  min="1"
                  className="mt-1 w-28 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={editing.targetPerDay}
                  onChange={(e) => setEditing({ ...editing, targetPerDay: Number(e.target.value) })}
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="h-10 rounded-lg bg-indigo-600 px-4 text-white font-medium hover:bg-indigo-700">Save</button>
                <button type="button" onClick={() => setEditing(null)} className="h-10 rounded-lg bg-gray-200 px-4 font-medium hover:bg-gray-300">Cancel</button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;


