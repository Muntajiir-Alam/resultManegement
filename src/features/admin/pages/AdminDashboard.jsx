import { useState } from 'react';
import { useSelector } from 'react-redux';
import StatsCard from '../components/StatsCard';
import TeacherAccessForm from '../../teacherManagement/components/TeacherAccessForm';
import TeacherListItem from '../../teacherManagement/components/TeacherListItem';
import EmptyState from '../../../shared/components/EmptyState';
import { createTeacher, fetchTeachers, deleteTeacher } from '../../teacherManagement/services/teacherAPI';

export default function AdminDashboard() {
  const token = useSelector((state) => state.auth.token);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleAccessTeacher = async (payload) => {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const result = await createTeacher(payload, token);
      setMessage(`Teacher "${result.data.name}" accessed successfully.`);
      handleGetTeachers();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to access teacher.');
    } finally {
      setSaving(false);
    }
  };

  const handleGetTeachers = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTeachers(token);
      setTeachers(result.data || []);
      setMessage(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to load teachers.');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
      <p className="mt-2 text-slate-400">Overview of students, exams, and results.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Students" value="462" accent="bg-cyan-600" />
        <StatsCard label="Exams" value="12" accent="bg-slate-800" />
        <StatsCard label="Published Results" value="8" accent="bg-emerald-600" />
        <StatsCard label="Pending Marks" value="34" accent="bg-rose-600" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section>
          <TeacherAccessForm onSubmit={handleAccessTeacher} />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-100">Teachers</h3>
            <button
              onClick={handleGetTeachers}
              disabled={loading}
              className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Get All Teachers'}
            </button>
          </div>

          {error ? (
            <p className="mb-4 rounded-2xl bg-rose-900/90 px-4 py-3 text-sm text-rose-100">{error}</p>
          ) : null}
          {message ? (
            <p className="mb-4 rounded-2xl bg-emerald-900/90 px-4 py-3 text-sm text-emerald-100">{message}</p>
          ) : null}

          {teachers.length === 0 ? (
            <EmptyState title="No teachers" message='Click "Get All Teachers" to load the list.' />
          ) : (
            <div>
              <p className="mb-3 text-sm text-slate-400">Total: {teachers.length}</p>
              {teachers.map((teacher) => (
                <TeacherListItem key={teacher._id} teacher={teacher} onDelete={handleDeleteTeacher} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
