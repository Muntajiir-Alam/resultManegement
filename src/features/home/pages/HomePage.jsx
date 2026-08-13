import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import StudentsTab from '../../teachers/components/StudentsTab';
import AnimatedNumber from '../../../shared/components/AnimatedNumber';
import { fetchTeachersCount, fetchStudentsCount } from '../../teachers/services/teacherPanelAPI';

function StatCard({ label, value, loading, icon, gradient }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`relative overflow-hidden rounded-3xl p-5 text-white shadow-lg ${gradient}`}
    >
      <div className="pointer-events-none absolute -right-4 -top-5 h-24 w-24 rounded-full bg-white/10 blur-xl"></div>
      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/20">
        {icon}
      </span>
      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/80">{label}</p>
      <p className="mt-1 font-display text-4xl font-extrabold">
        {loading ? '…' : <AnimatedNumber value={value ?? 0} />}
      </p>
    </motion.div>
  );
}

export default function HomePage() {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.user?.role);
  const isAdmin = role === 'admin';

  const [teacherCount, setTeacherCount] = useState(null);
  const [studentCount, setStudentCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const loadStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const [students, teachers] = await Promise.all([
          fetchStudentsCount(token),
          isAdmin ? fetchTeachersCount(token) : Promise.resolve(null)
        ]);
        if (!active) return;
        setStudentCount(students);
        if (teachers !== null) setTeacherCount(teachers);
      } catch (e) {
        if (active) setError(e?.response?.data?.message || 'Could not load stats.');
      } finally {
        if (active) setLoading(false);
      }
    };
    loadStats();
    return () => {
      active = false;
    };
  }, [token, isAdmin]);

  return (
    <div className="space-y-5">
      <section className="header-gradient relative overflow-hidden rounded-3xl p-6 text-white shadow-lg shadow-emerald-900/20 sm:p-8">
        <div className="pointer-events-none absolute -right-6 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
        <div className="pointer-events-none absolute bottom-2 right-4 text-7xl opacity-20">📊</div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">
            {isAdmin ? 'Admin Home' : 'Teacher Home'}
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            Welcome back 👋
          </h1>
          <p className="mt-1 text-sm text-emerald-100/90">
            Here's the school at a glance — counts load automatically.
          </p>
        </motion.div>
      </section>

      {error && <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-600">{error}</p>}

      <motion.section
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard
          loading={loading}
          label="Students"
          value={studentCount ?? 0}
          gradient="bg-gradient-to-br from-emerald-600 to-teal-700"
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
        {isAdmin && (
          <StatCard
            loading={loading}
            label="Teachers"
            value={teacherCount ?? 0}
            gradient="bg-gradient-to-br from-teal-600 to-cyan-700"
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
                <path d="M22 10v6" />
              </svg>
            }
          />
        )}
      </motion.section>

      <StudentsTab />
    </div>
  );
}