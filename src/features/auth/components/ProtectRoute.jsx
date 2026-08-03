import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../../../shared/components/Loader';

export default function ProtectRoute({ children }) {
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  if (status === 'loading') return <Loader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}