import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import ProtectRoute from './features/auth/components/ProtectRoute';
import AdminLayout from './navigation/AdminLayout';
import StudentNav from './navigation/StudentNav';
import MeritList from './features/merit/pages/MeritList';
import ViewResult from './features/resultView/pages/ViewResult';
import ResultEntryPage from './features/resultEntry/pages/ResultEntryPage';
import ViewResultPage from './features/resultEntry/pages/ViewResultPage';
import TeachersList from './features/teachers/pages/TeachersList';
import TeacherAccessPage from './features/teachers/pages/TeacherAccessPage';

function HomeIndex() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={user?.role === 'admin' ? '/admin' : '/student'} replace />;
}

function StudentLayout() {
  return (
    <div className="relative min-h-screen">
      <div className="scene" />
      <StudentNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-10 sm:px-6 md:pl-64">
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
        <Route path="teachers" element={<TeachersList />} />
        <Route path="teacher-access" element={<TeacherAccessPage />} />
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