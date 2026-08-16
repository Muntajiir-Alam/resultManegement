import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  fetchExams,
  fetchClasses,
  fetchSections,
  fetchStudents,
  fetchReportCard
} from '../../teacherPanel/services/teacherPanelAPI';
import { Field, Select, PrimaryBtn, Message, Card, thCls, tdCls } from '../../teacherPanel/components/TeacherUI';

export default function ViewResultPage() {
  const token = useSelector((state) => state.auth.token);

  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [examValue, setExamValue] = useState('');
  const [classValue, setClassValue] = useState('');
  const [sectionValue, setSectionValue] = useState('');
  const [admissionNo, setAdmissionNo] = useState('');

  const [loadingOptions, setLoadingOptions] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);

  const loadOptions = async () => {
    setLoadingOptions(true);
    setError(null);
    try {
      const [e, c] = await Promise.all([fetchExams(token), fetchClasses(token)]);
      setExams(e);
      setClasses(c);
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
    setClassValue(className);
    setSectionValue('');
    setSections([]);
    if (!className) return;
    try {
      setSections(await fetchSections(token, className));
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load sections.');
    }
  };

  const handleGetResult = async () => {
    if (!examValue || !classValue || !sectionValue || !admissionNo.trim()) {
      setError('Please fill exam, class, section and admission no.');
      return;
    }
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const students = await fetchStudents(token, { class: classValue, section: sectionValue });
      const student = students.find((s) => s.admissionNumber === admissionNo.trim());
      if (!student) {
        setError('No student found with this admission number.');
        return;
      }
      setReport(await fetchReportCard(token, student._id, examValue));
    } catch (e) {
      setError(e?.response?.data?.message || 'No result found for these details.');
    } finally {
      setLoading(false);
    }
  };

  const academics = report?.academics || [];
  const meta = report?.metaData || null;

  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl font-extrabold text-slate-800">View Result</h2>
      <p className="-mt-4 text-sm text-slate-500">Check a student's full mark sheet.</p>

      <Card title="Find a student" subtitle="Dropdowns load automatically from the API.">
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Exam">
            <Select value={examValue} onChange={(e) => setExamValue(e.target.value)}>
              <option value="">Select exam</option>
              {exams.map((ex) => (
                <option key={ex._id} value={ex.name}>{ex.name}</option>
              ))}
            </Select>
          </Field>
          <Field label="Class">
            <Select value={classValue} onChange={(e) => handleClassChange(e.target.value)}>
              <option value="">Select class</option>
              {classes.map((c) => (
                <option key={c} value={c}>Class {c}</option>
              ))}
            </Select>
          </Field>
          <Field label="Section">
            <Select
              value={sectionValue}
              onChange={(e) => setSectionValue(e.target.value)}
              disabled={!classValue}
            >
              <option value="">Select section</option>
              {sections.map((s) => (
                <option key={s} value={s}>Section {s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Admission No">
            <input
              value={admissionNo}
              onChange={(e) => setAdmissionNo(e.target.value)}
              placeholder="e.g. 2026-001"
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-3 py-3 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </Field>
        </div>

        <div className="mt-4">
          <PrimaryBtn onClick={handleGetResult} loading={loading} loadingText="Fetching...">
            Get Result
          </PrimaryBtn>
        </div>
      </Card>

      {loadingOptions && <p className="text-sm text-slate-500">Loading filters...</p>}
      <Message type="error" text={error} />

      {report && (
        <div className="glass rounded-3xl p-6">
          <div className="border-b pb-4 text-center">
            <h2 className="text-2xl font-bold tracking-wide">ACADEMIC ACHIEVEMENT</h2>
            <h3 className="mt-2 text-lg font-semibold">
              {academics[0]?.student?.name || academics[0]?.student || 'Student'}
            </h3>
            <p className="text-sm text-gray-600">
              {examValue} | Class {classValue} | Section {sectionValue} | Admission No. {admissionNo}
            </p>
          </div>

          <div className="nice-scroll mt-6 overflow-x-auto rounded-xl bg-white/40">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr>
                  {['Subject', 'Max Marks', 'Theory', 'Practical', 'Total', 'Grade'].map((h) => (
                    <th key={h} className={thCls}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {academics.map((item) => (
                  <tr key={item._id} className="hover:bg-emerald-50/50">
                    <td className={tdCls}>
                      <span className="font-medium text-slate-800">{item.subject?.name || '-'}</span>
                    </td>
                    <td className={tdCls}>
                      {(item.subject?.maxTheoryMarks || 0) + (item.subject?.maxPracticalMarks || 0)}
                    </td>
                    <td className={tdCls}>{item.theoryMarks}</td>
                    <td className={tdCls}>{item.practicalMarks}</td>
                    <td className={tdCls}>
                      <span className="font-semibold text-slate-800">{item.totalMarks}</span>
                    </td>
                    <td className={tdCls}>{item.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {meta && (
            <div className="mt-5 space-y-1 text-sm text-slate-700">
              {meta.remarks && (
                <p><span className="font-semibold">Remarks:</span> {meta.remarks}</p>
              )}
              <p>
                <span className="font-semibold">Final Result:</span>{' '}
                <span className="font-bold text-emerald-700">{meta.finalResult || 'Passed'}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}