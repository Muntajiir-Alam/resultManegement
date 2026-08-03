export default function EditableMarksTable({ students, onChange }) {
  const handleTheory = (admissionNo, value) => onChange(admissionNo, 'theory', value);
  const handlePaper = (admissionNo, value) => onChange(admissionNo, 'paper', value);

  const thCls =
    'border-b border-slate-200 bg-slate-100/70 px-3 py-2.5 text-center text-[11px] font-bold uppercase tracking-wide text-slate-600';
  const tdNumCls = 'whitespace-nowrap border-b border-slate-100 bg-white/40 px-3 py-2 text-center text-sm text-slate-700';
  const tdTextCls =
    'whitespace-nowrap border-b border-slate-100 bg-white/40 px-3 py-2 text-left text-sm text-slate-700';
  const inputCls =
    'w-full rounded-xl border border-emerald-200 bg-white px-2 py-1.5 text-center text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500';
  const maxBadge = 'inline-flex min-w-[44px] justify-center rounded-lg bg-slate-700 px-2 py-1 text-xs font-semibold text-white';

  return (
    <div className="glass rounded-3xl p-4">
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="font-display text-base font-bold text-slate-800">Students List</h3>
        <span className="rounded-full header-gradient px-3 py-1 text-xs font-semibold text-white">
          {students.length} student{students.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="nice-scroll overflow-x-auto rounded-2xl bg-white/40">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr>
              <th className={thCls} rowSpan="2">
                S.No
              </th>
              <th className={thCls} rowSpan="2">
                Admission
              </th>
              <th className={thCls} rowSpan="2">
                Name
              </th>
              <th className={thCls} rowSpan="2">
                Sec
              </th>
              <th className={thCls} rowSpan="2">
                Class
              </th>
              <th className={thCls} rowSpan="2">
                Subject
              </th>
              <th className={thCls} colSpan="2">
                Theory
              </th>
              <th className={thCls} colSpan="2">
                Paper
              </th>
            </tr>
            <tr>
              <th className={thCls}>Max</th>
              <th className={thCls}>Obtained</th>
              <th className={thCls}>Max</th>
              <th className={thCls}>Obtained</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={student.admissionNo} className="hover:bg-emerald-50/50">
                <td className={tdNumCls}>{idx + 1}</td>
                <td className={tdNumCls}>{student.admissionNo}</td>
                <td className={tdTextCls}>
                  <span className="font-medium text-slate-800">{student.name}</span>
                </td>
                <td className={tdNumCls}>{student.section}</td>
                <td className={tdNumCls}>{student.class}</td>
                <td className={tdTextCls}>{student.subject}</td>
                <td className={tdNumCls}>
                  <span className={maxBadge}>{student.theory.max}</span>
                </td>
                <td className={tdNumCls}>
                  <input
                    type="number"
                    min="0"
                    max={student.theory.max}
                    value={student.theory.obtained}
                    onChange={(e) => handleTheory(student.admissionNo, Number(e.target.value || 0))}
                    className={inputCls}
                    placeholder="0"
                  />
                </td>
                <td className={tdNumCls}>
                  <span className={maxBadge}>{student.paper.max}</span>
                </td>
                <td className={tdNumCls}>
                  <input
                    type="number"
                    min="0"
                    max={student.paper.max}
                    value={student.paper.obtained}
                    onChange={(e) => handlePaper(student.admissionNo, Number(e.target.value || 0))}
                    className={inputCls}
                    placeholder="0"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}