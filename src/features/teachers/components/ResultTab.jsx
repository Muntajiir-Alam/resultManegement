import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
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
      />
    </Card>
  );
}