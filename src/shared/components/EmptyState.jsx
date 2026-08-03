export default function EmptyState({ title = 'No data', message = 'Nothing to show right now.' }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl px-6 py-16 text-center">
      <p className="text-xl font-semibold text-slate-100">{title}</p>
      <p className="mt-2 max-w-sm text-center text-slate-400">{message}</p>
    </div>
  );
}