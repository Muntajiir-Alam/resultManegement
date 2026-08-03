import { useSelector } from 'react-redux';
import EmptyState from '../../../shared/components/EmptyState';

export default function RoleGuard({ role, children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <EmptyState title="No user data" message="Unable to determine permissions." />;
  }

  if (user.role !== role) {
    return <EmptyState title="Access denied" message="You do not have permission to view this page." />;
  }

  return children;
}