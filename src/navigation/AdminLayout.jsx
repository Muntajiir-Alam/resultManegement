import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" fill="currentColor">
      <path d="M12 2c-3.9 0-7 3.1-7 7 0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-500" fill="currentColor">
      <path d="M7.4 8.6 12 13.2l4.6-4.6 1.4 1.4-6 6-4.3-4.2z" />
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

const navItems = [
  { to: '/admin', label: 'Home', end: true },
  { to: '/admin/view-result', label: 'Result', end: false },
  { to: '/admin/merit', label: 'Merit', end: false }
];

const base =
  'flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition';
const stateCls = ({ isActive }) =>
  isActive
    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
    : 'text-slate-500 hover:bg-emerald-500/10 hover:text-emerald-700';

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((state) => state.auth.user?.name);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const initial = (name || 'A').trim().charAt(0).toUpperCase();

  return (
    <div className="">
      <div className="relative flex min-h-screen flex-col">
        {/* Top header */}
        <header className="glass-deep sticky top-0 z-20 px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <PinIcon />
              <div>
                <p className="font-display text-sm font-bold leading-tight text-slate-800">
                  Result Portal
                </p>
                <p className="hidden text-xs text-slate-500 sm:block">Admin • Science Wing</p>
              </div>
              <ChevronDownIcon />
            </div>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((n) => (
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

        {/* Content */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-28 sm:px-6 md:pb-10">
          <Outlet />
        </main>

        <footer className="hidden py-6 text-center text-xs text-slate-400 md:block">
          Result Management System
        </footer>

        {/* Mobile floating bottom nav */}
        <nav className="fixed inset-x-4 bottom-4 z-30 flex justify-center md:hidden">
          <div className="glass flex w-full max-w-sm items-center gap-1 rounded-3xl px-2 py-2">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) => `${base} ${stateCls({ isActive })} flex-1`}
              >
                {n.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}