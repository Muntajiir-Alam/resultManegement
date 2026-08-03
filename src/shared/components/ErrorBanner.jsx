export default function ErrorBanner({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-xl bg-rose-900/90 px-4 py-3">
      <p className="text-sm font-semibold text-rose-100">Error</p>
      <p className="mt-1 text-slate-100">{message}</p>
    </div>
  );
}