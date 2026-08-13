import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/pages/Login';
import ProtectRoute from './features/auth/components/ProtectRoute';
import AdminLayout from './navigation/AdminLayout';
import StudentNav from './navigation/StudentNav';
import TeacherLayout from './navigation/TeacherLayout';
import MeritList from './features/merit/pages/MeritList';
import ViewResult from './features/resultView/pages/ViewResult';
import ViewResultPage from './features/resultEntry/pages/ViewResultPage';
import TeachersList from './features/teachers/pages/TeachersList';
import TeacherAccessPage from './features/teachers/pages/TeacherAccessPage';
import StudentsTab from './features/teachers/components/StudentsTab';
import ClassesTab from './features/teachers/components/ClassesTab';
import SectionsTab from './features/teachers/components/SectionsTab';
import ExamsTab from './features/teachers/components/ExamsTab';
import ResultTab from './features/teachers/components/ResultTab';
import UploadMarksheetPage from './features/teachers/pages/UploadMarksheetPage';
import RemoveMarksheetTab from './features/teachers/components/RemoveMarksheetTab';
import ReportCardTab from './features/teachers/components/ReportCardTab';

const isTeacherRole = (role) => role === 'teacher' || role === 'classteacher';

const homeFor = (role) => {
  if (role === 'admin') return '/admin';
  if (isTeacherRole(role)) return '/teacher';
  return '/student';
};

function HomeIndex() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={homeFor(user?.role)} replace />;
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
        <Route index element={<Navigate to="view-result" replace />} />
        <Route path="view-result" element={<ViewResultPage />} />
        <Route path="merit" element={<MeritList />} />
        <Route path="teachers" element={<TeachersList />} />
        <Route path="teacher-access" element={<TeacherAccessPage />} />
      </Route>
      <Route
        path="/teacher/*"
        element={
          <ProtectRoute>
            <TeacherLayout />
          </ProtectRoute>
        }
      >
        <Route index element={<StudentsTab />} />
        <Route path="classes" element={<ClassesTab />} />
        <Route path="sections" element={<SectionsTab />} />
        <Route path="exams" element={<ExamsTab />} />
        <Route path="result" element={<ResultTab />} />
        <Route path="upload" element={<UploadMarksheetPage />} />
        <Route path="remove" element={<RemoveMarksheetTab />} />
        <Route path="report-card" element={<ReportCardTab />} />
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