import { useState } from 'react';
import ResultEntryForm from '../components/ResultEntryForm';
import MarksTable from '../components/MarksTable';
import { fetchStudents, submitMarks } from '../services/entryApi';

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ResultEntryPage() {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  const handleFetch = async (values) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    setQuery('');
    try {
      const data = await fetchStudents(values);
      setStudents(data);
      setFilters(values);
      setFetched(true);
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load students. Please try again.');
      setFetched(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (admissionNo, field, value) => {
    setStudents((prev) =>
      prev.map((s) => (s.admissionNo === admissionNo ? { ...s, [field]: { ...s[field], obtained: value } } : s))
    );
  };

  const handleSubmit = async () => {
    if (!students.length) return;
    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      const res = await submitMarks({
        exam: filters.exam,
        class: filters.class,
        section: filters.section,
        subject: filters.subject,
        marks: students.map((s) => ({
          admissionNo: s.admissionNo,
          theory: s.theory.obtained,
          paper: s.paper.obtained
        }))
      });
      setMessage(res?.message || 'Marks saved successfully.');
    } catch (e) {
      setError(e?.response?.data?.message || 'Unable to save marks. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const q = query.trim().toLowerCase();
  const shown = q ? students.filter((s) => s.name.toLowerCase().includes(q) || s.admissionNo.toLowerCase().includes(q)) : students;

  const scrollToFilters = () => {
    document.getElementById('filter-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-5">
      {/* Hero banner */}
      <section className="header-gradient relative overflow-hidden rounded-3xl p-6 text-white shadow-lg shadow-emerald-900/20 sm:flex sm:items-center sm:justify-between sm:p-8">
        <div className="pointer-events-none absolute -right-6 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
        <div className="pointer-events-none absolute right-4 bottom-2 text-7xl opacity-20">❄️</div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">Result Entry</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            Marks in, <span className="text-emerald-300">stress out.</span>
          </h1>
          <p className="mt-1 text-sm text-emerald-100/90">
            Bulkedit all obtained marks for any class in one go.
          </p>
        </div>
        <button
          onClick={scrollToFilters}
          className="mt-5 rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-800 shadow-md transition hover:scale-[1.03] sm:mt-0"
        >
          Start Entry ➔
        </button>
      </section>

      {/* Search */}
      <section className="flex items-center gap-2.5 rounded-3xl glass px-4 py-3">
        <SearchIcon />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search students or admission no..."
          className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
        />
      </section>

      {/* Status messages */}
      {error && <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-600">{error}</p>}
      {message && (
        <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 px-4 py-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="text-sm font-medium text-emerald-700">{message}</p>
        </div>
      )}

      {/* Filter form */}
      <section id="filter-section" className="scroll-mt-24">
        <ResultEntryForm onSubmit={handleFetch} loading={loading} />
      </section>

      {/* Table */}
      {(fetched || students.length > 0) && (
        <section className="space-y-3">
          <MarksTable students={shown} onChange={handleChange} />
          {shown.length > 0 && (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full rounded-2xl header-gradient py-4 font-display text-sm font-bold tracking-wide text-white shadow-lg shadow-emerald-700/20 transition hover:brightness-110 disabled:opacity-60 sm:w-auto sm:px-10"
            >
              {submitting ? 'Submitting...' : 'Submit All Marks'}
            </button>
          )}
        </section>
      )}
    </div>
  );
}