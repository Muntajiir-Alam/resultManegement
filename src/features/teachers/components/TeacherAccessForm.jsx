import { useForm } from 'react-hook-form';

function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m10.5 12.5 9-9M15 8l2.5 2.5M19 4l.5.5M13 10l2.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function TeacherAccessForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: '', accessCode: '', role: 'Teacher' }
  });

  const handleFormSubmit = (data) => {
    onSubmit({ name: data.name, accessCode: data.accessCode, role: data.role });
    reset({ name: '', accessCode: '', role: 'Teacher' });
  };

  return (
    <div className="space-y-5">
      <section className="header-gradient relative overflow-hidden rounded-3xl p-6 text-white shadow-lg shadow-emerald-900/20 sm:p-8">
        <div className="pointer-events-none absolute -right-6 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
        <div className="pointer-events-none absolute bottom-2 right-4 text-6xl opacity-20">
          <KeyIcon />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">Teacher Access</p>
          <h2 className="mt-1 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            Give a teacher <span className="text-emerald-300">access.</span>
          </h2>
          <p className="mt-1 text-sm text-emerald-100/90">Let teachers enter marks for their subjects.</p>
        </div>
      </section>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="glass rounded-3xl p-5 sm:p-6">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Teacher name</label>
            <input
              {...register('name', { required: true })}
              placeholder="e.g. Rahul Sharma"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Access code</label>
            <input
              {...register('accessCode', { required: true })}
              placeholder="e.g. TCH1010"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Role</label>
            <select
              {...register('role')}
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
            >
              <option value="Teacher">Teacher</option>
              <option value="ClassTeacher">Class Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl header-gradient py-4 font-display text-sm font-bold tracking-wide text-white shadow-lg shadow-emerald-700/20 transition hover:brightness-110"
          >
            Access Teacher
          </button>
        </div>
      </form>
    </div>
  );
}
