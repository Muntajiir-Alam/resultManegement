import MarksEntryRow from './MarksEntryRow';

export default function MarksEntryList({ students, onChange }) {
  return (
    <div>
      {students.map((student) => (
        <MarksEntryRow key={student.id} student={student} onChange={onChange} />
      ))}
    </div>
  );
}