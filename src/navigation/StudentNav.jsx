import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" fill="currentColor">
      <path d="M12 2c-3.9 0-7 3.1-7 7 0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const tabs = [
  { to: '/student', label: 'Results', end: true },
  { to: '/student/merit', label: 'Merit', end: false }
];

const base = 'flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition';
const stateCls = ({ isActive }) =>
  isActive
    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
    : 'text-slate-500 hover:bg-emerald-500/10 hover:text-emerald-700';

export default function StudentNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((state) => state.auth.user?.name);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const initial = (name || 'S').trim().charAt(0).toUpperCase();

  return (
    <>
      <header className="glass-deep sticky top-0 z-20 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <PinIcon />
            <div>
              <p className="font-display text-sm font-bold leading-tight text-slate-800">Student Portal</p>
              <p className="hidden text-xs text-slate-500 sm:block">Results &amp; Rankings</p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {tabs.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `${base} ${stateCls({ isActive })}`}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button onClick={handleLogout} className="relative rounded-full bg-white/70 p-2 shadow-sm">
              <BellIcon />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500"></span>
            </button>
            <button
              title="Logout"
              onClick={handleLogout}
              className="flex h-9 w-9 items-center justify-center rounded-full header-gradient font-display text-sm font-bold text-white shadow-md"
            >
              {initial}
            </button>
          </div>
        </div>
      </header>

      <nav className="fixed inset-x-4 bottom-4 z-30 flex justify-center md:hidden">
        <div className="glass flex w-full max-w-sm items-center gap-1 rounded-3xl px-2 py-2">
          {tabs.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) => `${base} ${stateCls({ isActive })} flex-1`}
            >
              {n.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex flex-1 items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-rose-500 transition hover:bg-rose-500/10"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}