import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeritList } from '../services/meritThunks';
import RankListItem from '../components/RankListItem';
import EmptyState from '../../../shared/components/EmptyState';

export default function MeritList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.merit);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchMeritList());
  }, [dispatch, status]);

  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl font-extrabold text-slate-800">Merit List</h2>
      <p className="-mt-4 text-sm text-slate-500">Top ranking students by total points.</p>

      {status === 'loading' ? (
        <p className="text-sm text-slate-500">Loading rank data...</p>
      ) : items.length === 0 ? (
        <EmptyState title="No ranks yet" message="Merit list will appear when results are released." />
      ) : (
        <div>
          {items.map((item) => (
            <RankListItem key={item.id} item={item} />
          ))}
        </div>
      )}
      {error ? <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}