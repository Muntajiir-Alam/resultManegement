import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TeacherListItem from '../components/TeacherListItem';
import EmptyState from '../../../shared/components/EmptyState';
import { fetchTeachers, deleteTeacher } from '../services/teacherAPI';

export default function TeachersList() {
  const token = useSelector((state) => state.auth.token);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetTeachers = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTeachers(token);
      setTeachers(result.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to load teachers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteTeacher = async (teacherId) => {
    setError(null);
    try {
      await deleteTeacher(teacherId, token);
      setTeachers((prev) => prev.filter((t) => t._id !== teacherId));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to delete teacher.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      {error ? (
        <p className="mb-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-600">{error}</p>
      ) : null}

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-slate-800">Teachers</h2>
          <p className="mt-1 text-sm text-slate-500">Manage teachers with access to enter marks.</p>
        </div>
        <button
          onClick={handleGetTeachers}
          disabled={loading}
          className="rounded-2xl header-gradient px-5 py-3 font-display text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:brightness-110 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {loading && teachers.length === 0 ? (
        <p className="rounded-2xl bg-white/60 px-4 py-3 text-sm text-slate-500">Loading teachers...</p>
      ) : teachers.length === 0 ? (
        <div className="glass rounded-3xl">
          <EmptyState title="No teachers" message="No teachers available right now." />
        </div>
      ) : (
        <div>
          <p className="mb-3 text-sm font-medium text-slate-500">Total: {teachers.length}</p>
          {teachers.map((teacher) => (
            <TeacherListItem key={teacher._id} teacher={teacher} onDelete={handleDeleteTeacher} />
          ))}
        </div>
      )}
    </div>
  );
}
