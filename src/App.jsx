import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import ForgotPassword from './features/auth/pages/ForgotPassword';
import ProtectRoute from './features/auth/components/ProtectRoute';
import AdminLayout from './navigation/AdminLayout';
import StudentNav from './navigation/StudentNav';
import MeritList from './features/merit/pages/MeritList';
import ViewResult from './features/resultView/pages/ViewResult';
import ResultEntryPage from './features/resultEntry/pages/ResultEntryPage';
import ViewResultPage from './features/resultEntry/pages/ViewResultPage';

function HomeIndex() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={user?.role === 'admin' ? '/admin' : '/student'} replace />;
}

function StudentLayout() {
  return (
    <div className="min-h-screen bg-slate-950 pb-16">
      <StudentNav />
      <main className="pt-6">
        <Routes>
          <Route index element={<ViewResult />} />
          <Route path="merit" element={<MeritList />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeIndex />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/admin/*"
        element={
          <ProtectRoute>
            <AdminLayout />
          </ProtectRoute>
        }
      >
        <Route index element={<Navigate to="result-entry" replace />} />
        <Route path="result-entry" element={<ResultEntryPage />} />
        <Route path="view-result" element={<ViewResultPage />} />
        <Route path="merit" element={<MeritList />} />
      </Route>
      <Route
        path="/student/*"
        element={
          <ProtectRoute>
            <StudentLayout />
          </ProtectRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}