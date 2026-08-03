import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authThunks';
import ErrorBanner from '../../../shared/components/ErrorBanner';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status, isAuthenticated, user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  if (isAuthenticated) {
    navigate(user?.role === 'admin' ? '/admin' : '/student', { replace: true });
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white">Welcome back</h1>
        <p className="mt-2 text-slate-300">Sign in to continue to the result system.</p>

        <div className="mt-10 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mt-4 text-right">
          <Link to="/forgot-password" className="text-cyan-400 hover:text-cyan-300">
            Forgot password?
          </Link>
        </div>

        {error ? (
          <div className="mt-4">
            <ErrorBanner message={error} />
          </div>
        ) : null}

        <button
          onClick={handleLogin}
          disabled={status === 'loading'}
          className="mt-8 w-full rounded-2xl bg-cyan-500 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
        >
          {status === 'loading' ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="mt-8 text-center text-slate-500">
          Use admin@example.com for admin or student@example.com for student.
        </p>
      </div>
    </div>
  );
}