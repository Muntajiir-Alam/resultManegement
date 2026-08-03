import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../services/authThunks';
import ErrorBanner from '../../../shared/components/ErrorBanner';

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M13 2 4.5 13H11l-2 9 8.5-11H12l1.5-9z" />
    </svg>
  );
}

const roles = [
  { key: 'admin', label: 'Admin', icon: '🛡️' },
  { key: 'teacher', label: 'Teacher', icon: '👩🏫' }
];

export default function Login() {
  const dispatch = useDispatch();
  const { error, status, isAuthenticated, user } = useSelector((state) => state.auth);
  const [role, setRole] = useState('admin');

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');

  const [name, setName] = useState('Teacher User');
  const [accessCode, setAccessCode] = useState('123456');

  const isAdmin = role === 'admin';

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(isAdmin ? { role, email, password } : { role, name, accessCode }));
  };

  if (isAuthenticated) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/student'} replace />;
  }

  const fieldCls =
    'w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3.5 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500';
  const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500';

  return (
    <div className="">
      <div className="flex min-h-screen items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-6 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl header-gradient text-white shadow-lg shadow-emerald-700/25">
              <SparkIcon />
            </span>
            <h1 className="mt-4 font-display text-2xl font-extrabold text-slate-800">Result Portal</h1>
            <p className="mt-1 text-sm text-slate-500">Sign in to the result management system.</p>
          </div>

          <form onSubmit={handleLogin} className="glass rounded-3xl p-6">
            <div className="mb-5 grid grid-cols-2 gap-1 rounded-2xl bg-slate-800/10 p-1">
              {roles.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRole(r.key)}
                  className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 font-display text-sm font-bold transition ${
                    role === r.key ? 'header-gradient text-white shadow-md' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <span>{r.icon}</span>
                  {r.label}
                </button>
              ))}
            </div>

            {isAdmin ? (
              <>
                <label className={labelCls}>Email / Username</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  className={`${fieldCls} mb-4`}
                />
                <label className={labelCls}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  className={fieldCls}
                />
              </>
            ) : (
              <>
                <label className={labelCls}>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className={`${fieldCls} mb-4`}
                />
                <label className={labelCls}>Access Code</label>
                <input
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter access code"
                  autoComplete="current-password"
                  className={fieldCls}
                />
              </>
            )}

            {error ? (
              <div className="mt-4">
                <ErrorBanner message={error} />
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-5 w-full rounded-2xl header-gradient py-3.5 font-display text-sm font-bold tracking-wide text-white shadow-lg shadow-emerald-700/20 transition hover:brightness-110 disabled:opacity-60"
            >
              {status === 'loading' ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Admin signs in with email & password. Teacher uses name & access code.
          </p>
        </div>
      </div>
    </div>
  );
}