import { useState, useEffect } from 'react';

export default function ExamForm({ onSubmit, initialValues = {} }) {
  const [title, setTitle] = useState(initialValues.title || '');
  const [date, setDate] = useState(initialValues.date || '');

  useEffect(() => {
    setTitle(initialValues.title || '');
    setDate(initialValues.date || '');
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...initialValues, title, date });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-slate-900 p-5 shadow-lg shadow-black/20">
      <h3 className="text-lg font-semibold text-slate-100">Exam details</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Exam title"
        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Exam date (YYYY-MM-DD)"
        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <button
        type="submit"
        className="w-full rounded-2xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        Save exam
      </button>
    </form>
  );
}