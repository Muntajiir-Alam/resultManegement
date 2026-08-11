import { useForm } from 'react-hook-form';

export default function SubjectConfigForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: '', maxMarks: '100' }
  });

  const handleFormSubmit = (data) => {
    onSubmit({ name: data.name, maxMarks: Number(data.maxMarks) || 100 });
    reset({ name: '', maxMarks: '100' });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 rounded-3xl bg-slate-900 p-5 shadow-lg shadow-black/20">
      <h3 className="text-lg font-semibold text-slate-100">Add subject</h3>
      <input
        {...register('name')}
        placeholder="Subject name"
        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <input
        {...register('maxMarks')}
        placeholder="Maximum marks"
        type="number"
        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <button
        type="submit"
        className="w-full rounded-2xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        Save subject
      </button>
    </form>
  );
}