import { useState } from 'react';
import { Field, Select, PrimaryBtn } from '../../teacherPanel/components/TeacherUI';

export default function UploadMarksheetForm({ exams, classes, sections, subjects, onClassChange, onSubmit, loading }) {
  const [exam, setExam] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  const [error, setError] = useState(null);

  const canSubmit = !!(exam && className && section && subject);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) {
      setError('Please fill all the filters first.');
      return;
    }
    setError(null);
    onSubmit({ exam, class: className, section, subject });
  };

  const handleClassChange = (value) => {
    setClassName(value);
    setSection('');
    setError(null);
    onClassChange(value);
  };

  return (
    <form onSubmit={handleFormSubmit} className="glass rounded-3xl p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl header-gradient text-white shadow-md">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M10 4 4 10v10h6v-6h4v6h6V10l-6-6z" />
          </svg>
        </span>
        <div>
          <h3 className="font-display text-base font-bold text-slate-800">Pick a filter</h3>
          <p className="text-xs text-slate-500">Choose the exam &amp; class to begin entry.</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Exam">
          <Select value={exam} onChange={(e) => setExam(e.target.value)}>
            <option value="">Select exam</option>
            {exams.map((ex) => (
              <option key={ex._id} value={ex.name}>{ex.name}</option>
            ))}
          </Select>
        </Field>
        <Field label="Class">
          <Select value={className} onChange={(e) => handleClassChange(e.target.value)}>
            <option value="">Select class</option>
            {classes.map((c) => (
              <option key={c} value={c}>Class {c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Section">
          <Select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            disabled={!className}
          >
            <option value="">Select section</option>
            {sections.map((s) => (
              <option key={s} value={s}>Section {s}</option>
            ))}
          </Select>
        </Field>
        <Field label="Subject">
          <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">Select subject</option>
            {subjects.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </Select>
        </Field>
      </div>

      {error && <p className="mt-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-600">{error}</p>}

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