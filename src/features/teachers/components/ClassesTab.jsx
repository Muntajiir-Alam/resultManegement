import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchClasses } from '../services/teacherPanelAPI';
import { PrimaryBtn, Message, Card, SimpleTable, tdCls } from './TeacherUI';

export default function ClassesTab() {
  const token = useSelector((state) => state.auth.token);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadClasses = async () => {
    setLoading(true);
    setError(null);
    try {
      setClasses(await fetchClasses(token));
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load classes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classes.length === 0) loadClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card title="Classes" subtitle="All available classes in the school.">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">Total: {classes.length}</p>
        <PrimaryBtn onClick={loadClasses} loading={loading} loadingText="Loading...">Refresh</PrimaryBtn>
      </div>
      <Message type="error" text={error} />
      <SimpleTable
        rows={classes}
        emptyText="No classes found."
        head={['S.No', 'Class']}
        renderRow={(className, i) => (
          <tr key={className} className="hover:bg-emerald-50/50">
            <td className={tdCls}>{i + 1}</td>
            <td className={tdCls}>
              <span className="font-semibold text-slate-800">Class {className}</span>
            </td>
          </tr>
        )}
      />
    </Card>
  );
}