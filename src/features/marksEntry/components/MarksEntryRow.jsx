export default function MarksEntryRow({ student, onChange }) {
  return (
    <div className="mb-3 rounded-3xl bg-slate-900 p-4">
      <p className="text-lg font-semibold text-slate-100">{student.name}</p>
      <p className="mt-1 text-slate-400">Roll: {student.roll}</p>
      <div className="mt-4 flex items-center justify-between">
        <input
          value={String(student.marks)}
          type="number"
          onChange={(e) => onChange(student.id, Number(e.target.value || 0))}
          className="w-24 rounded-2xl border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <span className="text-slate-400">/100</span>
      </div>
    </div>
  );
}