import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchClasses, fetchSections } from '../services/teacherPanelAPI';
import { Field, Select, PrimaryBtn, Message, Card, SimpleTable, tdCls } from './TeacherUI';

export default function SectionsTab() {
  const token = useSelector((state) => state.auth.token);
  const [classes, setClasses] = useState([]);
  const [classValue, setClassValue] = useState('');
  const [sections, setSections] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [loadingSections, setLoadingSections] = useState(false);
  const [error, setError] = useState(null);

  const loadClasses = async () => {
    setLoadingClasses(true);
    setError(null);
    try {
      setClasses(await fetchClasses(token));
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load classes.');
    } finally {
      setLoadingClasses(false);
    }
  };

  useEffect(() => {
    if (classes.length === 0) loadClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetSections = async () => {
    if (!classValue) {
      setError('Please select a class first.');
      return;
    }
    setLoadingSections(true);
    setError(null);
    try {
      setSections(await fetchSections(token, classValue));
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load sections.');
    } finally {
      setLoadingSections(false);
    }
  };

  return (
    <Card title="Sections" subtitle="Sections available under a class.">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Field label="Class">
          <Select value={classValue} onChange={(e) => setClassValue(e.target.value)}>
            <option value="">Select class</option>
            {classes.map((c) => (
              <option key={c} value={c}>Class {c}</option>
            ))}
          </Select>
        </Field>
        <div className="flex items-end">
          <PrimaryBtn onClick={handleGetSections} loading={loadingSections} loadingText="Loading...">
            Get Sections
          </PrimaryBtn>
        </div>
      </div>
      {loadingClasses && <p className="mt-4 text-sm text-slate-500">Loading classes...</p>}
      <Message type="error" text={error} />
      <p className="mb-3 mt-2 text-sm font-medium text-slate-500">Total: {sections.length}</p>
      <SimpleTable
        rows={sections}
        emptyText="No sections found."
        head={['S.No', 'Section']}
        renderRow={(section, i) => (
          <tr key={section} className="hover:bg-emerald-50/50">
            <td className={tdCls}>{i + 1}</td>
            <td className={tdCls}>
              <span className="font-semibold text-slate-800">Section {section}</span>
            </td>
          </tr>
        )}
      />
    </Card>
  );
}