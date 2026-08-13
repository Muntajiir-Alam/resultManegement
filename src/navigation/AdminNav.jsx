import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const tabs = [
  { name: 'View Result', to: '/admin/view-result' },
  { name: 'Merit', to: '/admin/merit' }
];

export default function AdminNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900 px-4 py-3">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <h1 className="text-lg font-bold text-white">Result Management — Admin</h1>
        <nav className="flex flex-wrap items-center gap-1">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.to}
              end={tab.to === '/admin'}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="ml-2 rounded-xl px-3 py-2 text-sm font-medium text-rose-300 hover:text-rose-200"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}