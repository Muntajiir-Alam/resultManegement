function MedalIcon({ color }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M12 2l2.4 4.8L20 8l-4 3.6L17 18l-5-3-5 3 1-6.4L4 8l5.6-1.2z" />
    </svg>
  );
}

export default function ResultCard({ report }) {
  const totalMarks = report.subjects.reduce((sum, subject) => sum + subject.marks, 0);
  const average = (totalMarks / report.subjects.length).toFixed(1);

  return (
    <div className="space-y-5">
      {/* Student summary card */}
      <div className="glass rounded-3xl p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl header-gradient text-white shadow-md">
            <MedalIcon />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-xl font-extrabold text-slate-800">{report.student.name}</h2>
            <p className="text-sm text-slate-500">
              Roll {report.student.roll} • Class {report.student.class}
            </p>
          </div>
          <div className="flex gap-4 text-center">
            <div>
              <p className="font-display text-2xl font-black text-emerald-700">{totalMarks}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Total</p>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <p className="font-display text-2xl font-black text-emerald-700">{average}%</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Average</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject breakdown */}
      <div className="glass rounded-3xl p-5">
        <h3 className="font-display text-base font-bold text-slate-800">Subject-wise Marks</h3>
        <div className="mt-4 divide-y divide-slate-200/70">
          {report.subjects.map((subject) => (
            <div key={subject.name} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <p className="font-medium text-slate-700">{subject.name}</p>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                    style={{ width: `${Math.min(subject.marks, 100)}%` }}
                  ></div>
                </div>
                <span className="w-10 text-right font-display text-base font-extrabold text-slate-800">
                  {subject.marks}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full rounded-2xl header-gradient py-4 font-display text-sm font-bold tracking-wide text-white shadow-lg shadow-emerald-700/20 transition hover:brightness-110 sm:w-auto sm:px-10">
        Download Report
      </button>
    </div>
  );
}