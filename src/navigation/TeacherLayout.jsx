import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import AppSidebar from './AppSidebar';

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

const navItems = [
  { to: '/teacher', label: 'Students', end: true },
  { to: '/teacher/classes', label: 'Classes', end: false },
  { to: '/teacher/sections', label: 'Sections', end: false },
  { to: '/teacher/exams', label: 'Exams', end: false },
  { to: '/teacher/result', label: 'Result', end: false },
  { to: '/teacher/upload', label: 'Upload Marksheet', end: false },
  { to: '/teacher/remove', label: 'Remove Marksheet', end: false },
  { to: '/teacher/report-card', label: 'Report Card', end: false }
];

export default function TeacherLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((state) => state.auth.user?.name);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const closeDrawer = () => setOpen(false);
  const initial = (name || 'T').trim().charAt(0).toUpperCase() || 'T';

  return (
    <div className="flex min-h-screen">
      {/* Desktop left sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 overflow-hidden rounded-r-3xl md:block">
        <AppSidebar
          title="Teacher Portal"
          subtitle="Marks & Results"
          role="Teacher"
          items={navItems}
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
          title="Teacher Portal"
          subtitle="Marks & Results"
          role="Teacher"
          items={navItems}
          name={name}
          onLogout={handleLogout}
          onClose={closeDrawer}
        />
      </aside>

      <div className="flex min-h-screen flex-1 flex-col md:pl-64">
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

            <div className="hidden text-sm font-semibold text-slate-500 md:block">Teacher Panel</div>

            <div className="ml-auto flex items-center gap-2.5">
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
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-10 sm:px-6">
          <Outlet />
        </main>

        <footer className="hidden py-6 text-center text-xs text-slate-400 md:block">
          Result Management System
        </footer>
      </div>
    </div>
  );
}