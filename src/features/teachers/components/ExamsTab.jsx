import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchExams } from '../services/teacherPanelAPI';
import { PrimaryBtn, Message, Card, SimpleTable, tdCls } from './TeacherUI';

export default function ExamsTab() {
  const token = useSelector((state) => state.auth.token);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadExams = async () => {
    setLoading(true);
    setError(null);
    try {
      setExams(await fetchExams(token));
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load exams.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (exams.length === 0) loadExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card title="Exams" subtitle="All exams configured by the admin.">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">Total: {exams.length}</p>
        <PrimaryBtn onClick={loadExams} loading={loading} loadingText="Loading...">Refresh</PrimaryBtn>
      </div>
      <Message type="error" text={error} />
      <SimpleTable
        rows={exams}
        emptyText="No exams found."
        head={['S.No', 'Exam Name', 'Term']}
        renderRow={(exam, i) => (
          <tr key={exam._id} className="hover:bg-emerald-50/50">
            <td className={tdCls}>{i + 1}</td>
            <td className={tdCls}>
              <span className="font-semibold text-slate-800">{exam.name}</span>
            </td>
            <td className={tdCls}>{exam.term || '-'}</td>
          </tr>
        )}
      />
    </Card>
  );
}