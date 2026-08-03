import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ExamForm from '../components/ExamForm';
import { updateExam } from '../services/examThunks';
import EmptyState from '../../../shared/components/EmptyState';

export default function ExamEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exam = useSelector((state) => state.exams.items.find((item) => item.id === id));
  const [message, setMessage] = useState(null);

  const handleSave = async (values) => {
    await dispatch(updateExam(values));
    setMessage('Exam updated successfully.');
    setTimeout(() => {
      navigate('/admin/exams');
    }, 800);
  };

  if (!exam) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <EmptyState title="Exam not found" message="The exam you are editing does not exist." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h2 className="text-2xl font-bold text-white">Edit Exam</h2>
      <div className="mt-6">
        <ExamForm onSubmit={handleSave} initialValues={exam} />
        {message ? <p className="mt-4 text-cyan-300">{message}</p> : null}
      </div>
    </div>
  );
}