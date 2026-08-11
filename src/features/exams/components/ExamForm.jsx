import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function ExamForm({ onSubmit, initialValues = {} }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { title: initialValues.title || '', date: initialValues.date || '' }
  });

  useEffect(() => {
    reset({ title: initialValues.title || '', date: initialValues.date || '' });
  }, [initialValues, reset]);

  const handleFormSubmit = (data) => {
    onSubmit({ ...initialValues, ...data });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 rounded-3xl bg-slate-900 p-5 shadow-lg shadow-black/20">
      <h3 className="text-lg font-semibold text-slate-100">Exam details</h3>
      <input
        {...register('title')}
        placeholder="Exam title"
        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <input
        {...register('date')}
        placeholder="Exam date (YYYY-MM-DD)"
        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <button
        type="submit"
        className="w-full rounded-2xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        Save exam
      </button>
    </form>
  );
}