import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import AppSidebar from './AppSidebar';
import UserMenu from './UserMenu';

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-slate-700" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const tabs = [
  { to: '/student', label: 'Results', end: true },
  { to: '/student/merit', label: 'Merit', end: false }
];

export default function StudentNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((state) => state.auth.user?.name);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const closeDrawer = () => setOpen(false);

  return (
    <>
      {/* Desktop left sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 overflow-hidden rounded-r-3xl md:block">
        <AppSidebar
          title="Student Portal"
          subtitle="Results & Rankings"
          role="Student"
          items={tabs}
          name={name}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile drawer overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden" onClick={closeDrawer} />
      )}

      {/* Mobile left sidebar drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 overflow-hidden rounded-r-3xl transition-transform duration-300 md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AppSidebar
          title="Student Portal"
          subtitle="Results & Rankings"
          role="Student"
          items={tabs}
          name={name}
          onLogout={handleLogout}
          onClose={closeDrawer}
        />
      </aside>

      {/* Top bar */}
      <header className="glass-deep sticky top-0 z-20 px-4 py-3 sm:px-6">
        <div className="mx-auto flex items-center justify-between gap-3">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-xl bg-white/70 p-2 shadow-sm md:hidden"
          >
            <MenuIcon />
          </button>

          <div className="hidden text-sm font-semibold text-slate-500 md:block">Student Panel</div>

          <div className="ml-auto flex items-center gap-2.5">
            <button aria-label="Notifications" title="Notifications" className="relative rounded-full bg-white/70 p-2 shadow-sm">
              <BellIcon />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500"></span>
            </button>
            <UserMenu name={name} onLogout={handleLogout} />
          </div>
        </div>
      </header>
    </>
  );
}
