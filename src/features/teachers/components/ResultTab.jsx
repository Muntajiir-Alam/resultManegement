import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchExams, fetchSubjects, fetchResults } from '../services/teacherPanelAPI';
import { Field, Select, PrimaryBtn, Message, Card, SimpleTable, tdCls } from './TeacherUI';

export default function ResultTab() {
  const token = useSelector((state) => state.auth.token);
  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examValue, setExamValue] = useState('');
  const [subjectValue, setSubjectValue] = useState('');
  const [results, setResults] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadFilters = async () => {
    setLoadingFilters(true);
    setError(null);
    try {
      const [e, s] = await Promise.all([fetchExams(token), fetchSubjects(token)]);
      setExams(e);
      setSubjects(s);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not load filters.');
    } finally {
      setLoadingFilters(false);
    }
  };

  useEffect(() => {
    if (exams.length === 0) loadFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetResults = async () => {
    if (!examValue) {
      setError('Please select an exam.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setResults(await fetchResults(token, { exam: examValue, subjectId: subjectValue }));
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Result" subtitle="View entered marks for an exam / subject.">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Field label="Exam">
          <Select value={examValue} onChange={(e) => setExamValue(e.target.value)}>
            <option value="">Select exam</option>
            {exams.map((ex) => (
              <option key={ex._id} value={ex.name}>{ex.name}</option>
            ))}
          </Select>
        </Field>
        <Field label="Subject (optional)">
          <Select value={subjectValue} onChange={(e) => setSubjectValue(e.target.value)}>
            <option value="">All subjects</option>
            {subjects.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </Select>
        </Field>
        <div className="flex items-end">
          <PrimaryBtn onClick={handleGetResults} loading={loading} loadingText="Loading...">
            Get Result
          </PrimaryBtn>
        </div>
      </motion.div>
      {loadingFilters && <p className="mt-4 text-sm text-slate-500">Loading filters...</p>}
      <Message type="error" text={error} />
      <p className="mb-3 mt-2 text-sm font-medium text-slate-500">Total: {results.length}</p>
      <SimpleTable
        rows={results}
        emptyText="No results available. Upload marks first."
        head={['Student', 'Admission No', 'Class', 'Section', 'Subject', 'Theory', 'Practical', 'Total', 'Grade']}
        renderRow={(result, i) => (
          <tr key={`${result._id}-${i}`} className="hover:bg-emerald-50/50">
            <td className={tdCls}>
              <span className="font-medium text-slate-800">{result.student?.name || '-'}</span>
            </td>
            <td className={tdCls}>{result.student?.admissionNumber || '-'}</td>
            <td className={tdCls}>{result.student?.class || '-'}</td>
            <td className={tdCls}>{result.student?.section || '-'}</td>
            <td className={tdCls}>{result.subject?.name || '-'}</td>
            <td className={tdCls}>{result.theoryMarks}</td>
            <td className={tdCls}>{result.practicalMarks}</td>
            <td className={tdCls}>
              <span className="font-semibold text-slate-800">{result.totalMarks}</span>
            </td>
            <td className={tdCls}>{result.grade}</td>
          </tr>
        )}
        renderMobile={(result, i) => (
          <div key={`${result._id}-${i}`} className="rounded-2xl border border-emerald-100/80 bg-white/60 p-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {result.student?.name || 'Unknown'}
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {result.student?.admissionNumber || '-'} · Class {result.student?.class || '-'}
                  {result.student?.section ? ` · Sec ${result.student.section}` : ''}
                </p>
              </div>
              <span className="shrink-0 rounded-lg bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">
                {result.grade || '-'}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-slate-500">{result.subject?.name || '-'}</p>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-emerald-50/70 px-2 py-1.5 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">Theory</p>
                <p className="text-sm font-semibold text-slate-800">{result.theoryMarks}</p>
              </div>
              <div className="rounded-xl bg-teal-50/70 px-2 py-1.5 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">Practical</p>
                <p className="text-sm font-semibold text-slate-800">{result.practicalMarks}</p>
              </div>
              <div className="rounded-xl bg-slate-100 px-2 py-1.5 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-600">Total</p>
                <p className="text-sm font-bold text-slate-900">{result.totalMarks}</p>
              </div>
            </div>
          </div>
        )}
      />
    </Card>
  );
}