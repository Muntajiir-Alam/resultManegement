import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../services/authThunks';
import ErrorBanner from '../../../shared/components/ErrorBanner';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const { error, resetMessage, status } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    dispatch(requestPasswordReset(email));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white">Forgot Password</h1>
        <p className="mt-2 text-slate-300">Enter your email to get a reset link.</p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            autoComplete="email"
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          {error ? <ErrorBanner message={error} /> : null}
          {resetMessage ? (
            <div className="rounded-2xl bg-cyan-800 p-4">
              <p className="text-cyan-100">{resetMessage}</p>
            </div>
          ) : null}

          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className="w-full rounded-2xl bg-cyan-500 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
          >
            {status === 'loading' ? 'Sending...' : 'Send reset link'}
          </button>

          <div className="pt-2 text-center">
            <Link to="/login" className="text-slate-400 hover:text-slate-200">
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}