import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubjects, saveSubject, removeSubject } from '../services/subjectThunks';
import SubjectConfigForm from '../components/SubjectConfigForm';
import SubjectListItem from '../components/SubjectListItem';
import EmptyState from '../../../shared/components/EmptyState';

export default function SubjectConfig() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.subjects);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchSubjects());
  }, [dispatch, status]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h2 className="text-2xl font-bold text-white">Subject Config</h2>
      <div className="mt-6">
        <SubjectConfigForm onSubmit={(subject) => dispatch(saveSubject(subject))} />
      </div>
      <div className="mt-6">
        {status === 'loading' ? (
          <p className="text-slate-400">Loading subjects...</p>
        ) : items.length === 0 ? (
          <EmptyState title="No subjects" message="Add subjects and max marks here." />
        ) : (
          items.map((item) => (
            <SubjectListItem key={item.id} subject={item} onRemove={(id) => dispatch(removeSubject(id))} />
          ))
        )}
        {error ? <p className="mt-4 text-rose-400">{error}</p> : null}
      </div>
    </div>
  );
}