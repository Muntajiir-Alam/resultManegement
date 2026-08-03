import { useState } from 'react';
import { examOptions, classOptions, sectionOptions, fetchResult } from '../services/entryApi';

export default function ViewResultPage() {
  const [exam, setExam] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [admissionNo, setAdmissionNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const selectClass =
    'w-full rounded-2xl border border-white/60 bg-white/80 px-3 py-3 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500';
  const fieldClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await fetchResult({ exam, class: className, section, admissionNo });
      setResult(data);
    } catch (err) {
      setError(err?.response?.data?.message || 'No result found for these details.');
    } finally {
      setLoading(false);
    }
  };

  const thCls =
    'border-b border-slate-200 bg-slate-100/70 px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-wide text-slate-600';
  const tdCls = 'border-b border-slate-100 bg-white/40 px-3 py-2.5 text-sm text-slate-700';

  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl font-extrabold text-slate-800">View Result</h2>
      <p className="-mt-4 text-sm text-slate-500">Check a student's full mark sheet.</p>

      <form onSubmit={handleSubmit} className="glass rounded-3xl p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl header-gradient text-white shadow-md">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M3 5h18v4H3zM3 11h12v4H3zM3 17h7v2H3zM17 15l3 2v3h-2v-2.2l-3-2z" />
            </svg>
          </span>
          <h3 className="font-display text-base font-bold text-slate-800">Find a student</h3>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <label className={fieldClass}>Exam</label>
            <select value={exam} onChange={(e) => setExam(e.target.value)} required className={selectClass}>
              <option value="" disabled>
                Select
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
                Select
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
                Select
              </option>
              {sectionOptions.map((o) => (
                <option key={o} value={o}>
                  Sec {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={fieldClass}>Admission No</label>
            <input
              value={admissionNo}
              onChange={(e) => setAdmissionNo(e.target.value)}
              placeholder="e.g. 2026-001"
              required
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-3 py-3 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-2xl header-gradient py-3.5 font-display text-sm font-bold tracking-wide text-white shadow-lg shadow-emerald-700/20 transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? 'Fetching...' : 'Get Result'}
        </button>
      </form>

      {error && <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-600">{error}</p>}

      {result && (
        <div className="glass rounded-3xl p-5">
          <div className="mb-4 px-1">
            <h3 className="font-display text-lg font-bold text-slate-800">{result.student?.name}</h3>
            <p className="text-xs text-slate-500">
              {result.exam} • Class {result.class} • Sec {result.section} • {result.admissionNo}
            </p>
          </div>

          <div className="nice-scroll overflow-x-auto rounded-2xl bg-white/40">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className={thCls}>Subject</th>
                  <th className={thCls}>Theory</th>
                  <th className={thCls}>Paper</th>
                  <th className={thCls}>Total</th>
                </tr>
              </thead>
              <tbody>
                {result.subjects.map((sub) => {
                  const total = (sub.theory?.obtained || 0) + (sub.paper?.obtained || 0);
                  return (
                    <tr key={sub.subject}>
                      <td className={tdCls}>{sub.subject}</td>
                      <td className={tdCls}>
                        {sub.theory?.obtained} / {sub.theory?.max}
                      </td>
                      <td className={tdCls}>
                        {sub.paper?.obtained} / {sub.paper?.max}
                      </td>
                      <td className={`${tdCls} font-bold text-emerald-700`}>{total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}