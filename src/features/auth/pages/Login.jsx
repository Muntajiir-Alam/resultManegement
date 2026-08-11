import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { login } from '../services/authThunks';
import ErrorBanner from '../../../shared/components/ErrorBanner';

function EyeIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      {open ? (
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12zM8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

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

  const { register, handleSubmit, watch, control } = useForm({
    defaultValues: {
      role: 'admin',
      email: 'admin@example.com',
      password: 'password',
      name: 'Teacher User',
      accessCode: '123456'
    }
  });

  const role = watch('role');
  const isAdmin = role === 'admin';
  const [showPassword, setShowPassword] = useState(false);
  const [showAccessCode, setShowAccessCode] = useState(false);

  const handleLogin = (data) => {
    dispatch(login(isAdmin ? { role: data.role, email: data.email, password: data.password } : { role: data.role, name: data.name, accessCode: data.accessCode }));
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

          <form onSubmit={handleSubmit(handleLogin)} className="glass rounded-3xl p-6">
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <div className="mb-5 grid grid-cols-2 gap-1 rounded-2xl bg-slate-800/10 p-1">
                  {roles.map((r) => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => field.onChange(r.key)}
                      className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 font-display text-sm font-bold transition ${
                        field.value === r.key ? 'header-gradient text-white shadow-md' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      <span>{r.icon}</span>
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
            />

            {isAdmin ? (
              <>
                <label className={labelCls}>Email / Username</label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  className={`${fieldCls} mb-4`}
                />
                <label className={labelCls}>Password</label>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    placeholder="Password"
                    autoComplete="current-password"
                    className={fieldCls}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-400 transition hover:text-slate-600"
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <label className={labelCls}>Full Name</label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="Enter your name"
                  className={`${fieldCls} mb-4`}
                />
                <label className={labelCls}>Access Code</label>
                <div className="relative">
                  <input
                    type={showAccessCode ? 'text' : 'password'}
                    {...register('accessCode')}
                    placeholder="Enter access code"
                    autoComplete="current-password"
                    className={fieldCls}
                  />
                  <button
                    type="button"
                    onClick={() => setShowAccessCode((v) => !v)}
                    aria-label={showAccessCode ? 'Hide access code' : 'Show access code'}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-400 transition hover:text-slate-600"
                  >
                    <EyeIcon open={showAccessCode} />
                  </button>
                </div>
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