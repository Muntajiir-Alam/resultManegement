import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  fetchExams,
  fetchClasses,
  fetchSections,
  fetchStudents,
  fetchReportCard,
  downloadReportCard
} from '../services/teacherPanelAPI';
import { Field, Select, PrimaryBtn, Message, Card, thCls, tdCls } from './TeacherUI';

export default function ReportCardTab() {
  const token = useSelector((state) => state.auth.token);

  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);

  const [examValue, setExamValue] = useState('');
  const [classValue, setClassValue] = useState('');
  const [sectionValue, setSectionValue] = useState('');
  const [studentValue, setStudentValue] = useState('');

  const [report, setReport] = useState(null);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);

  const loadFilters = async () => {
    setLoadingFilters(true);
    setError(null);
    try {
      const [e, cl] = await Promise.all([fetchExams(token), fetchClasses(token)]);
      setExams(e);
      setClasses(cl);
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

  const handleClassChange = async (className) => {
    setClassValue(className);
    setSectionValue('');
    setStudentValue('');
    setStudents([]);
    if (!className) return;
    try {
      setSections(await fetchSections(token, className));
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load sections.');
    }
  };

  const handleSectionChange = async (sec) => {
    setSectionValue(sec);
    setStudentValue('');
    if (!sec) {
      setStudents([]);
      return;
    }
    try {
      setStudents(await fetchStudents(token, { class: classValue, section: sec }));
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load students.');
    }
  };

  const handleGet = async () => {
    if (!examValue || !studentValue) {
      setError('Please select an exam and a student.');
      return;
    }
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      setReport(await fetchReportCard(token, studentValue, examValue));
    } catch (e) {
      setError(e?.response?.data?.message || 'No report card found for this student & exam.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    setError(null);
    try {
      const blob = await downloadReportCard(token, studentValue, examValue);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ReportCard_${studentValue}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not download report card.');
    } finally {
      setDownloading(false);
    }
  };

  const academics = report?.academics || [];
  const meta = report?.metaData || null;

  return (
    <Card title="Report Card" subtitle="View and download a student's report card.">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
            onChange={(e) => handleSectionChange(e.target.value)}
            disabled={!classValue}
          >
            <option value="">Select section</option>
            {sections.map((s) => (
              <option key={s} value={s}>Section {s}</option>
            ))}
          </Select>
        </Field>
        <Field label="Student">
          <Select
            value={studentValue}
            onChange={(e) => setStudentValue(e.target.value)}
            disabled={!sectionValue}
          >
            <option value="">Select student</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.admissionNumber})
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <PrimaryBtn onClick={handleGet} loading={loading} loadingText="Loading...">
          Get Report Card
        </PrimaryBtn>
        {report && (
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="rounded-2xl bg-teal-600 px-5 py-3 font-display text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:brightness-110 disabled:opacity-60"
          >
            {downloading ? 'Downloading...' : 'Download PDF'}
          </button>
        )}
      </div>

      {loadingFilters && <p className="mt-4 text-sm text-slate-500">Loading filters...</p>}
      <Message type="error" text={error} />

      {report && (
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl border border-emerald-100 bg-white/60 p-4 shadow-sm">
            <h4 className="font-display text-sm font-bold text-slate-800">Academic Achievement</h4>
            <div className="nice-scroll mt-3 overflow-x-auto rounded-xl bg-white/40">
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
          </div>

          {meta && (
            <div className="rounded-2xl border border-emerald-100 bg-white/60 p-4 shadow-sm">
              <h4 className="font-display text-sm font-bold text-slate-800">Extra Activities & Remarks</h4>
              {meta.coCurricular?.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Co-Curricular</p>
                  <ul className="mt-1 space-y-0.5 text-sm text-slate-700">
                    {meta.coCurricular.map((c, i) => (
                      <li key={i}>{c.activityName}: <span className="font-semibold">{c.rating}</span></li>
                    ))}
                  </ul>
                </div>
              )}
              {meta.personalAssessment?.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Personal Assessment</p>
                  <ul className="mt-1 space-y-0.5 text-sm text-slate-700">
                    {meta.personalAssessment.map((p, i) => (
                      <li key={i}>{p.traitName}: <span className="font-semibold">{p.rating}</span></li>
                    ))}
                  </ul>
                </div>
              )}
              {meta.remarks && (
                <p className="mt-3 text-sm text-slate-700">
                  <span className="font-semibold">Remarks:</span> {meta.remarks}
                </p>
              )}
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-semibold">Final Result:</span>{' '}
                <span className="font-bold text-emerald-700">{meta.finalResult || 'Passed'}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}