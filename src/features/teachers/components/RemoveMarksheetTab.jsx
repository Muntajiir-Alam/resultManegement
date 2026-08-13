import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchExams, fetchSubjects, fetchResults, removeMarks } from '../services/teacherPanelAPI';
import { Field, Select, PrimaryBtn, Message, Card, SimpleTable, tdCls } from './TeacherUI';

export default function RemoveMarksheetTab() {
  const token = useSelector((state) => state.auth.token);
  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examValue, setExamValue] = useState('');
  const [subjectValue, setSubjectValue] = useState('');
  const [results, setResults] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

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

  const handlePreview = async () => {
    if (!examValue) {
      setError('Please select an exam.');
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      setResults(await fetchResults(token, { exam: examValue, subjectId: subjectValue }));
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load marks.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!examValue) {
      setError('Please select an exam.');
      return;
    }
    setRemoving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await removeMarks(token, { exam: examValue, subjectId: subjectValue });
      setMessage(
        res?.message ||
          `Marks removed successfully${res?.deletedCount != null ? ` (${res.deletedCount} records)` : ''}.`
      );
      setResults([]);
    } catch (e) {
      setError(e?.response?.data?.message || 'Unable to remove marks. Please try again.');
    } finally {
      setRemoving(false);
    }
  };

  return (
    <Card title="Remove Marksheet" subtitle="Delete entered marks for an exam / subject.">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Exam">
          <Select value={examValue} onChange={(e) => setExamValue(e.target.value)}>
            <option value="">Select exam</option>
            {exams.map((ex) => (
              <option key={ex._id} value={ex.name}>{ex.name}</option>
            ))}
          </Select>
        </Field>
        <Field label="Subject">
          <Select value={subjectValue} onChange={(e) => setSubjectValue(e.target.value)}>
            <option value="">All subjects</option>
            {subjects.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </Select>
        </Field>
        <div className="flex flex-wrap items-end gap-2">
          <PrimaryBtn onClick={handlePreview} loading={loading} loadingText="Loading...">
            Preview
          </PrimaryBtn>
          {results.length > 0 && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={removing}
              className="rounded-2xl bg-rose-600 px-5 py-3 font-display text-sm font-bold text-white shadow-lg shadow-rose-700/20 transition hover:brightness-110 disabled:opacity-60"
            >
              {removing ? 'Removing...' : 'Remove Marks'}
            </button>
          )}
        </div>
      </div>
      {loadingFilters && <p className="mt-4 text-sm text-slate-500">Loading filters...</p>}
      <Message type="error" text={error} />
      <Message type="success" text={message} />
      <p className="mb-3 mt-2 text-sm font-medium text-slate-500">Found: {results.length}</p>
      <SimpleTable
        rows={results}
        emptyText="No marks to remove. Pick an exam & subject, then click Preview."
        head={['Student', 'Admission No', 'Subject', 'Theory', 'Practical', 'Total', 'Grade']}
        renderRow={(result, i) => (
          <tr key={`${result._id}-${i}`} className="hover:bg-emerald-50/50">
            <td className={tdCls}>
              <span className="font-medium text-slate-800">{result.student?.name || '-'}</span>
            </td>
            <td className={tdCls}>{result.student?.admissionNumber || '-'}</td>
            <td className={tdCls}>{result.subject?.name || '-'}</td>
            <td className={tdCls}>{result.theoryMarks}</td>
            <td className={tdCls}>{result.practicalMarks}</td>
            <td className={tdCls}>
              <span className="font-semibold text-slate-800">{result.totalMarks}</span>
            </td>
            <td className={tdCls}>{result.grade}</td>
          </tr>
        )}
      />
    </Card>
  );
}