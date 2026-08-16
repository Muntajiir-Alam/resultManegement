import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResult } from '../services/resultViewThunks';
import ResultCard from '../components/ResultCard';
import Loader from '../../../shared/components/Loader';
import EmptyState from '../../../shared/components/EmptyState';

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M20 4h-3V2H7v2H4c-1.1 0-2 .9-2 2v1c0 2.6 2.1 4.5 4.6 4.9.7 1.2 1.9 2 3.4 2.2V17H7v2h10v-2h-3v-2.9c1.5-.2 2.7-1 3.4-2.2C20 11.5 22 9.6 22 7V6c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

export default function ViewResult() {
  const dispatch = useDispatch();
  const { report, status, error } = useSelector((state) => state.resultView);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchResult());
  }, [dispatch, status]);

  return (
    <div className="space-y-5">
      <section className="header-gradient relative overflow-hidden rounded-3xl p-6 text-white shadow-lg shadow-emerald-900/20 sm:p-8">
        <div className="pointer-events-none absolute -right-6 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
        <div className="pointer-events-none absolute bottom-2 right-4 text-6xl opacity-20">
          <TrophyIcon />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">Student Results</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            Your marks, <span className="text-emerald-300">your moment.</span>
          </h1>
          <p className="mt-1 text-sm text-emerald-100/90">Check your report card and keep pushing higher.</p>
        </div>
      </section>

      {status === 'loading' ? (
        <div className="glass rounded-3xl p-10">
          <Loader />
        </div>
      ) : error ? (
        <EmptyState title="Unable to load" message={error} />
      ) : report ? (
        <ResultCard report={report} />
      ) : (
        <EmptyState title="No result available" message="Your report will appear when it is published." />
      )}
    </div>
  );
}