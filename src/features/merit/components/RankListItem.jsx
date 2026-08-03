export default function RankListItem({ item }) {
  return (
    <div className="glass mb-3 flex items-center gap-3 rounded-2xl p-4">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-extrabold ${
          item.rank === 1 ? 'header-gradient text-white' : 'bg-emerald-100 text-emerald-700'
        }`}
      >
        {item.rank}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-base font-bold text-slate-800">{item.name}</p>
        <p className="text-xs text-slate-500">Rank {item.rank}</p>
      </div>
      <p className="font-display text-lg font-extrabold text-emerald-700">{item.total}</p>
    </div>
  );
}