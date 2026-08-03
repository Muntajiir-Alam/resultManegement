import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeritList } from '../services/meritThunks';
import RankListItem from '../components/RankListItem';
import EmptyState from '../../../shared/components/EmptyState';

function PodiumIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M3 15h4v5H3zM10 9h4v11h-4zM17 12h4v8h-4z" />
    </svg>
  );
}

export default function MeritList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.merit);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchMeritList());
  }, [dispatch, status]);

  return (
    <div className="space-y-5">
      <section className="header-gradient relative overflow-hidden rounded-3xl p-6 text-white shadow-lg shadow-emerald-900/20 sm:p-8">
        <div className="pointer-events-none absolute -right-6 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
        <div className="pointer-events-none absolute bottom-2 right-4 text-6xl opacity-20">
          <PodiumIcon />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">Merit List</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            Top <span className="text-emerald-300">rankers.</span>
          </h1>
          <p className="mt-1 text-sm text-emerald-100/90">Top ranking students by total points.</p>
        </div>
      </section>

      {status === 'loading' ? (
        <div className="glass rounded-3xl p-8 text-center text-sm text-slate-500">Loading rank data...</div>
      ) : items.length === 0 ? (
        <EmptyState title="No ranks yet" message="Merit list will appear when results are released." />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <RankListItem key={item.id} item={item} />
          ))}
        </div>
      )}
      {error ? <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}