import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchExams, createExam, deleteExam } from '../services/examThunks';
import ExamListItem from '../components/ExamListItem';
import ExamForm from '../components/ExamForm';
import EmptyState from '../../../shared/components/EmptyState';

export default function ExamManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((state) => state.exams);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchExams());
  }, [dispatch, status]);

  const handleCreate = (exam) => {
    dispatch(createExam(exam));
    setShowCreate(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Exam Management</h2>
        <button
          onClick={() => setShowCreate((value) => !value)}
          className="rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          {showCreate ? 'Cancel' : 'New'}
        </button>
      </div>

      {showCreate ? <ExamForm onSubmit={handleCreate} /> : null}

      <div className="mt-4">
        {status === 'loading' ? (
          <p className="text-slate-400">Loading exams...</p>
        ) : items.length === 0 ? (
          <EmptyState title="No exams" message="Create the first exam to start entering marks." />
        ) : (
          items.map((item) => (
            <ExamListItem
              key={item.id}
              exam={item}
              onEdit={() => navigate(`/admin/exams/${item.id}/edit`)}
              onDelete={() => dispatch(deleteExam(item.id))}
            />
          ))
        )}
        {error ? <p className="mt-4 text-rose-400">{error}</p> : null}
      </div>
    </div>
  );
}