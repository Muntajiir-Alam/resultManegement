import { createSlice } from '@reduxjs/toolkit';
import { sampleStudents, sampleExams } from './services/resultAPI';

const initialState = {
  exams: sampleExams,
  students: sampleStudents,
  selectedExamId: sampleExams[0]?.id || null,
  status: 'idle',
  error: null
};

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    selectExam(state, action) {
      state.selectedExamId = action.payload;
    },
    updateStudentMark(state, action) {
      const { studentId, marks } = action.payload;
      const student = state.students.find((item) => item.id === studentId);
      if (student) student.marks = marks;
    }
  }
});

export const { selectExam, updateStudentMark } = resultSlice.actions;
export default resultSlice.reducer;