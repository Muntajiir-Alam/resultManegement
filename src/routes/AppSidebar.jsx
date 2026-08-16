import { NavLink } from 'react-router-dom';

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M9.5 21v-6h5v6" />
    </svg>
  );
}

function IconResult() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M9 8h6M9 12h6M9 16h3.5" />
      <path d="m16.2 17.8 1.3 1.3 2.5-2.6" />
    </svg>
  );
}

function IconTrophy() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4" />
      <path d="M12 14v4M8 21h8M9.5 18h5" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconKey() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m10.5 12.5 9-9M15 8l2.5 2.5M19 4l.5.5M13 10l2.5 2.5" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function IconUpload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 16V4M6 10l6-6 6 6" />
      <path d="M4 20h16" />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  );
}

const iconMap = {
  Home: <IconHome />,
  Result: <IconResult />,
  Merit: <IconTrophy />,
  'Teachers': <IconUsers />,
  'Access': <IconKey />,
  'Students': <IconUsers />,
  'Marks Entry': <IconUpload />,
  'Report Card': <IconDoc />
};

const itemBase =
  'group relative flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-200';

export default function AppSidebar({ title, subtitle, role, items, name, onLogout, onClose }) {
  const initial = (name || 'A').trim().charAt(0).toUpperCase() || 'A';

  return (
    <div className="sidebar-shell flex h-full w-64 flex-col">
      <div className="relative overflow-hidden px-5 pb-5 pt-6">
        <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-300/25 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 ring-1 ring-emerald-200">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2 4 6v6c0 4.6 3.4 8.8 8 10 4.6-1.2 8-5.4 8-10V6l-8-4Z" />
              <path d="m8.5 12 2.3 2.3L15.5 9.5" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold tracking-tight text-slate-800">{title}</p>
            <p className="truncate text-[11px] font-medium text-slate-500">{subtitle}</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="absolute right-3 top-3 rounded-xl p-1.5 text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-600"
          >
            <IconClose />
          </button>
        )}
      </div>

      <div className="px-5 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
        Menu
      </div>

      <nav className="nice-scroll flex-1 space-y-1.5 overflow-y-auto px-3 pb-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `${itemBase} ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-500 hover:bg-emerald-500/10 hover:text-emerald-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-5 w-5 items-center justify-center transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-700'
                  }`}
                >
                  {iconMap[item.label] || null}
                </span>
                <span className="flex-1">{item.label}</span>
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-2 px-3 pb-5">
        <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 ring-1 ring-emerald-100">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 font-display text-xs font-bold text-white">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">{name || 'User'}</p>
            <p className="truncate text-[11px] text-slate-500">{role}</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold text-rose-500 transition hover:bg-rose-500/10 hover:text-rose-600"
        >
          <span className="flex h-5 w-5 items-center justify-center">
            <IconLogout />
          </span>
          Logout
        </button>
      </div>
    </div>
  );
}
