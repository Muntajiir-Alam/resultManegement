import StatsCard from '../components/StatsCard';

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
      <p className="mt-2 text-slate-400">Overview of students, exams, and results.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Students" value="462" accent="bg-cyan-600" />
        <StatsCard label="Exams" value="12" accent="bg-slate-800" />
        <StatsCard label="Published Results" value="8" accent="bg-emerald-600" />
        <StatsCard label="Pending Marks" value="34" accent="bg-rose-600" />
      </div>
    </div>
  );
}