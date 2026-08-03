export default function SubjectListItem({ subject, onRemove }) {
  return (
    <div className="mb-3 rounded-3xl bg-slate-900 p-4">
      <p className="text-lg font-semibold text-slate-100">{subject.name}</p>
      <p className="mt-1 text-slate-400">Max marks: {subject.maxMarks}</p>
      <button
        onClick={() => onRemove(subject.id)}
        className="mt-4 rounded-2xl bg-rose-600 px-4 py-2 text-slate-950 transition hover:bg-rose-500"
      >
        Remove
      </button>
    </div>
  );
}