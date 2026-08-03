export default function ExamListItem({ exam, onEdit, onDelete }) {
  return (
    <div className="mb-3 rounded-3xl bg-slate-900 p-4">
      <p className="text-lg font-semibold text-slate-100">{exam.title}</p>
      <p className="mt-1 text-slate-400">Date: {exam.date}</p>
      <div className="mt-4 flex justify-between">
        <button
          onClick={onEdit}
          className="rounded-2xl bg-cyan-600 px-4 py-2 text-slate-950 transition hover:bg-cyan-500"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="rounded-2xl bg-rose-600 px-4 py-2 text-slate-950 transition hover:bg-rose-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
}