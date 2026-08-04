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
        <div className="glass rounded-3xl p-6">
          {/* Header */}
          <div className="text-center border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold tracking-wide">
              ACADEMIC ACHIEVEMENT
            </h2>

            <h3 className="mt-2 text-lg font-semibold">
              {result.student?.name}
            </h3>

            <p className="text-sm text-gray-600">
              {result.exam} | Class {result.class} | Section {result.section} |
              Admission No. {result.admissionNo}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-700 text-center text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th rowSpan={2} className="border p-2">
                    Subject
                  </th>
                  <th colSpan={2} className="border p-2">
                    Theory
                  </th>
                  <th colSpan={2} className="border p-2">
                    Paper
                  </th>
                  <th rowSpan={2} className="border p-2">
                    Total
                  </th>
                </tr>

                <tr className="bg-gray-50">
                  <th className="border p-2">Obt.</th>
                  <th className="border p-2">Max</th>

                  <th className="border p-2">Obt.</th>
                  <th className="border p-2">Max</th>
                </tr>
              </thead>

              <tbody>
                {result.subjects.map((sub) => {
                  const total =
                    (sub.theory?.obtained || 0) +
                    (sub.paper?.obtained || 0);

                  const max =
                    (sub.theory?.max || 0) +
                    (sub.paper?.max || 0);

                  return (
                    <tr key={sub.subject}>
                      <td className="border p-2 text-left font-medium">
                        {sub.subject}
                      </td>

                      <td className="border p-2">
                        {sub.theory?.obtained}
                      </td>

                      <td className="border p-2">
                        {sub.theory?.max}
                      </td>

                      <td className="border p-2">
                        {sub.paper?.obtained}
                      </td>

                      <td className="border p-2">
                        {sub.paper?.max}
                      </td>

                      <td className="border p-2 font-bold text-blue-700">
                        {total} / {max}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-8 grid grid-cols-3 text-center text-sm">
            <div>
              <div className="border-t border-black pt-2 inline-block w-32">
                Class Teacher
              </div>
            </div>

            <div>
              <div className="border-t border-black pt-2 inline-block w-32">
                Parent
              </div>
            </div>

            <div>
              <div className="border-t border-black pt-2 inline-block w-32">
                Principal
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}