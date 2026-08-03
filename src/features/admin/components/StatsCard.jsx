export default function StatsCard({ label, value, accent }) {
  return (
    <div className={`rounded-3xl p-6 shadow-lg ${accent}`}>
      <p className="text-sm uppercase tracking-wide text-slate-200">{label}</p>
      <p className="mt-2 text-4xl font-bold text-white">{value}</p>
    </div>
  );
}