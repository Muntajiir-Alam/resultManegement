import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectExam, updateStudentMark } from '../resultSlice';
import ExamSelectionForm from '../components/ExamSelectionForm';
import MarksEntryList from '../components/MarksEntryList';

export default function MarksEntryScreen() {
  const dispatch = useDispatch();
  const { exams, students, selectedExamId } = useSelector((state) => state.results);

  useEffect(() => {
    if (!selectedExamId && exams.length > 0) {
      dispatch(selectExam(exams[0].id));
    }
  }, [dispatch, selectedExamId, exams]);

  const selectedExam = exams.find((exam) => exam.id === selectedExamId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h2 className="text-2xl font-bold text-white">Marks Entry</h2>
      <p className="mt-2 text-slate-400">Enter marks for the selected exam.</p>

      <div className="mt-6">
        <ExamSelectionForm
          exams={exams}
          selectedExam={selectedExamId}
          onSelect={(id) => dispatch(selectExam(id))}
        />
      </div>

      <div className="mt-6">
        <MarksEntryList
          students={students}
          onChange={(studentId, marks) => dispatch(updateStudentMark({ studentId, marks }))}
        />
      </div>

      <div className="rounded-3xl bg-slate-900 p-4">
        <p className="text-slate-300">Current exam:</p>
        <p className="mt-1 text-lg font-semibold text-white">{selectedExam?.title || 'Choose an exam'}</p>
      </div>
    </div>
  );
}