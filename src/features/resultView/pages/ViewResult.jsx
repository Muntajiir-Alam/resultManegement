import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResult } from '../services/resultViewThunks';
import ResultCard from '../components/ResultCard';
import DownloadReportButton from '../components/DownloadReportButton';
import Loader from '../../../shared/components/Loader';
import EmptyState from '../../../shared/components/EmptyState';

export default function ViewResult() {
  const dispatch = useDispatch();
  const { report, status, error } = useSelector((state) => state.resultView);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchResult());
  }, [dispatch, status]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h2 className="text-2xl font-bold text-white">My Result</h2>
      {status === 'loading' ? (
        <Loader />
      ) : error ? (
        <EmptyState title="Unable to load" message={error} />
      ) : report ? (
        <>
          <ResultCard report={report} />
          <DownloadReportButton onPress={() => {}} />
        </>
      ) : (
        <EmptyState title="No result available" message="Your report will appear when it is published." />
      )}
    </div>
  );
}