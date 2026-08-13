import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UploadMarksheetForm from '../components/UploadMarksheetForm';
import MarksTable from '../components/MarksTable';
import {
  fetchClasses,
  fetchSections,
  fetchExams,
  fetchSubjects,
  fetchStudents,
  submitMarks
} from '../services/teacherPanelAPI';

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

export default function UploadMarksheetPage() {
  const token = useSelector((state) => state.auth.token);

  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState(null);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 15;
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  const loadOptions = async () => {
    setLoadingOptions(true);
    setError(null);
    try {
      const [e, c, s] = await Promise.all([
        fetchExams(token),
        fetchClasses(token),
        fetchSubjects(token)
      ]);
      setExams(e);
      setClasses(c);
      setSubjects(s);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not load filters.');
    } finally {
      setLoadingOptions(false);
    }
  };

  useEffect(() => {
    loadOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClassChange = async (className) => {
    setSections([]);
    if (!className) return;
    try {
      setSections(await fetchSections(token, className));
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load sections.');
    }
  };

  const handleFetch = async (values) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    setQuery('');
    setPage(1);
    try {
      const subjectObj = subjects.find((s) => s._id === values.subject) || null;
      const list = await fetchStudents(token, { class: values.class, section: values.section });
      setCurrentSubject(subjectObj);
      setStudents(
        list.map((st) => ({
          _id: st._id,
          admissionNo: st.admissionNumber,
          name: st.name,
          section: st.section,
          class: st.class,
          subject: subjectObj?.name || '',
          theory: { max: subjectObj?.maxTheoryMarks || 100, obtained: 0 },
          paper: { max: subjectObj?.maxPracticalMarks || 30, obtained: 0 }
        }))
      );
      setFilters({ exam: values.exam, subjectId: values.subject });
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
      prev.map((s) =>
        s.admissionNo === admissionNo
          ? { ...s, [field]: { ...s[field], obtained: value } }
          : s
      )
    );
  };

  const handleSubmit = async () => {
    if (!students.length || !filters) return;
    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      const payload = {
        exam: filters.exam,
        subjectId: filters.subjectId,
        marks: students.map((s) => ({
          studentId: s._id,
          theoryMarks: s.theory.obtained,
          practicalMarks: s.paper.obtained
        }))
      };
      const res = await submitMarks(token, payload);
      setMessage(res?.message || 'Marks saved successfully.');
    } catch (e) {
      setError(e?.response?.data?.message || 'Unable to save marks. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const q = query.trim().toLowerCase();
  const shown = q
    ? students.filter((s) => s.name.toLowerCase().includes(q) || s.admissionNo.toLowerCase().includes(q))
    : students;
  const totalPages = Math.max(1, Math.ceil(shown.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStudents = shown.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const scrollToFilters = () => {
    document.getElementById('filter-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-5">
      <section className="header-gradient relative overflow-hidden rounded-3xl p-6 text-white shadow-lg shadow-emerald-900/20 sm:flex sm:items-center sm:justify-between sm:p-8">
        <div className="pointer-events-none absolute -right-6 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
        <div className="pointer-events-none absolute right-4 bottom-2 text-7xl opacity-20">❄️</div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">Marks Entry</p>
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

      <section className="flex items-center gap-2.5 rounded-3xl glass px-4 py-3">
        <SearchIcon />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search students or admission no..."
          className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
        />
      </section>

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

      <section id="filter-section" className="scroll-mt-24">
        <UploadMarksheetForm
          exams={exams}
          classes={classes}
          sections={sections}
          subjects={subjects}
          onClassChange={handleClassChange}
          onSubmit={handleFetch}
          loading={loading}
        />
      </section>

      {(fetched || students.length > 0) && (
        <section className="space-y-3">
          {currentSubject && (
            <p className="text-sm font-medium text-slate-500">
              Subject: <span className="font-semibold text-slate-800">{currentSubject.name}</span>
              {' · '}Exam: <span className="font-semibold text-slate-800">{filters?.exam}</span>
            </p>
          )}
          <MarksTable students={pageStudents} totalCount={shown.length} onChange={handleChange} />

          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl glass px-4 py-3">
              <p className="text-xs font-medium text-slate-500">
                Showing {shown.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
                {Math.min(safePage * PAGE_SIZE, shown.length)} of {shown.length}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage <= 1}
                  className="rounded-xl bg-white/80 px-3.5 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-white disabled:opacity-40"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-9 min-w-9 rounded-xl px-2 text-sm font-semibold transition ${
                      p === safePage
                        ? 'header-gradient text-white shadow-md'
                        : 'bg-white/80 text-slate-600 shadow-sm hover:bg-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage >= totalPages}
                  className="rounded-xl bg-white/80 px-3.5 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-white disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}

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