export default function ResultCard({ report }) {
  const totalMarks = report.subjects.reduce((sum, subject) => sum + subject.marks, 0);
  const average = (totalMarks / report.subjects.length).toFixed(1);

  return (
    <div className="rounded-3xl bg-slate-900 p-5 shadow-lg shadow-black/30">
      <h3 className="text-xl font-semibold text-white">Report Card</h3>
      <p className="mt-2 text-slate-400">Name: {report.student.name}</p>
      <p className="text-slate-400">Roll: {report.student.roll}</p>
      <p className="text-slate-400">Class: {report.student.class}</p>

      <div className="mt-4 rounded-3xl bg-slate-800 p-4">
        {report.subjects.map((subject) => (
          <div key={subject.name} className="mb-3 flex justify-between last:mb-0">
            <p className="text-slate-200">{subject.name}</p>
            <p className="text-slate-100">{subject.marks}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-3xl bg-slate-800 p-4">
        <p className="text-slate-200">Total Marks: {totalMarks}</p>
        <p className="mt-1 text-slate-200">Average: {average}</p>
      </div>
    </div>
  );
}