import { useState } from 'react';
import { useSelector } from 'react-redux';
import TeacherAccessForm from '../components/TeacherAccessForm';
import { createTeacher } from '../services/teacherAPI';

export default function TeacherAccessPage() {
  const token = useSelector((state) => state.auth.token);
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
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to access teacher.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {error ? (
        <p className="mb-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-600">{error}</p>
      ) : null}
      {message ? (
        <p className="mb-4 rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700">{message}</p>
      ) : null}

      <TeacherAccessForm onSubmit={handleAccessTeacher} />
    </div>
  );
}
