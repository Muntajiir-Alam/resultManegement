export default function ExamSelectionForm({ exams, selectedExam, onSelect }) {
  return (
    <div className="rounded-3xl bg-slate-900 p-4">
      <h3 className="text-lg font-semibold text-slate-100">Select exam</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {exams.map((exam) => {
          const active = selectedExam === exam.id;
          return (
            <button
              key={exam.id}
              onClick={() => onSelect(exam.id)}
              className={`rounded-2xl px-4 py-3 transition ${
                active ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-100 hover:bg-slate-700'
              }`}
            >
              {exam.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}