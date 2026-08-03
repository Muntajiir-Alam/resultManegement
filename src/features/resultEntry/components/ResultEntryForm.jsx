import { useState } from 'react';
import { examOptions, classOptions, sectionOptions, subjectOptions } from '../services/entryApi';

export default function ResultEntryForm({ onSubmit, loading }) {
  const [exam, setExam] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ exam, class: className, section, subject });
  };

const selectClass =
    'w-full rounded-2xl border border-white/60 bg-white/80 px-3 py-3 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500';
  const fieldClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500';

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl header-gradient text-white shadow-md">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M10 4 4 10v10h6v-6h4v6h6V10l-6-6z" />
          </svg>
        </span>
        <div>
          <h3 className="font-display text-base font-bold text-slate-800">Pick a filter</h3>
          <p className="text-xs text-slate-500">Choose the exam & class to begin entry.</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className={fieldClass}>Exam</label>
          <select value={exam} onChange={(e) => setExam(e.target.value)} required className={selectClass}>
            <option value="" disabled>
              Select exam
            </option>
            {examOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={fieldClass}>Class</label>
          <select value={className} onChange={(e) => setClassName(e.target.value)} required className={selectClass}>
            <option value="" disabled>
              Select class
            </option>
            {classOptions.map((o) => (
              <option key={o} value={o}>
                Class {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={fieldClass}>Section</label>
          <select value={section} onChange={(e) => setSection(e.target.value)} required className={selectClass}>
            <option value="" disabled>
              Select section
            </option>
            {sectionOptions.map((o) => (
              <option key={o} value={o}>
                Section {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={fieldClass}>Subject</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)} required className={selectClass}>
            <option value="" disabled>
              Select subject
            </option>
            {subjectOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-2xl header-gradient py-3.5 font-display text-sm font-bold tracking-wide text-white shadow-lg shadow-emerald-700/20 transition hover:brightness-110 disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {loading ? 'Loading...' : 'Get Students'}
      </button>
    </form>
  );
}