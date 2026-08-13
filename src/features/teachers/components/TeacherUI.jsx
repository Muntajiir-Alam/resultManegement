export const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500';
export const selectCls =
  'w-full rounded-2xl border border-white/60 bg-white/80 px-3 py-3 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500';
export const inputCls =
  'w-full rounded-2xl border border-white/60 bg-white/80 px-3 py-3 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500';
export const btnCls =
  'rounded-2xl header-gradient px-5 py-3 font-display text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:brightness-110 disabled:opacity-60';
export const ghostBtnCls =
  'rounded-2xl border border-emerald-200 bg-white/80 px-5 py-3 font-display text-sm font-bold text-emerald-800 shadow-sm transition hover:bg-emerald-50 disabled:opacity-60';

export function Field({ label, children, className = '' }) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

export function Select({ children, className = selectCls, ...rest }) {
  return (
    <select className={className} {...rest}>
      {children}
    </select>
  );
}

export function PrimaryBtn({ loading, loadingText = 'Loading...', children, ...rest }) {
  return (
    <button type="button" className={btnCls} {...rest}>
      {loading ? loadingText : children}
    </button>
  );
}

export function Message({ type = 'error', text }) {
  if (!text) return null;
  const classes =
    type === 'success'
      ? 'rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700'
      : 'rounded-2xl bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-600';
  return <p className={classes}>{text}</p>;
}

export function Card({ title, subtitle, children }) {
  return (
    <div className="glass rounded-3xl p-5">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="font-display text-base font-bold text-slate-800">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

export function EmptyRow({ text = 'Nothing to show right now.' }) {
  return <p className="py-8 text-center text-sm text-slate-500">{text}</p>;
}

export const thCls =
  'border-b border-slate-200 bg-slate-100/70 px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-wide text-slate-600';
export const tdCls = 'border-b border-slate-100 bg-white/40 px-3 py-2.5 text-sm text-slate-700';

export function SimpleTable({ head, rows, renderRow, emptyText }) {
  if (!rows || rows.length === 0) return <EmptyRow text={emptyText} />;
  return (
    <div className="nice-scroll overflow-x-auto rounded-2xl bg-white/40">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr>{head.map((h, i) => <th key={i} className={thCls}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => renderRow(row, i))}
        </tbody>
      </table>
    </div>
  );
}