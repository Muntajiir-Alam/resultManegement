const rankStyles = {
  1: 'header-gradient text-white',
  2: 'bg-slate-700 text-white',
  3: 'bg-amber-600 text-white'
};

export default function RankListItem({ item }) {
  const badgeCls = rankStyles[item.rank] || 'bg-emerald-100 text-emerald-700';

  return (
    <div className="glass flex items-center gap-3 rounded-3xl p-4">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-extrabold shadow-sm ${badgeCls}`}
      >
        {item.rank}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-base font-bold text-slate-800">{item.name}</p>
        <p className="text-xs text-slate-500">
          {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : `Rank ${item.rank}`}
        </p>
      </div>
      <p className="font-display text-lg font-extrabold text-emerald-700">{item.total}</p>
    </div>
  );
}