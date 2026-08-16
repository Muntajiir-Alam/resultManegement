function TeacherIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function TeacherListItem({ teacher, onDelete }) {
  return (
    <div className="glass mb-3 flex items-center justify-between gap-4 rounded-3xl p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl header-gradient text-white shadow-md">
          <TeacherIcon />
        </span>
        <div>
          <p className="font-display text-base font-bold text-slate-800">{teacher.name}</p>
          <p className="mt-0.5 text-sm text-slate-500">
            <span className="font-semibold text-emerald-700">{teacher.accessCode}</span> · {teacher.role}
          </p>
        </div>
      </div>
      <button
        onClick={() => onDelete(teacher._id)}
        className="shrink-0 rounded-2xl bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-500 hover:text-white"
      >
        Delete
      </button>
    </div>
  );
}
