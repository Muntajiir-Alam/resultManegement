import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import examReducer from '../features/exams/examSlice';
import subjectReducer from '../features/subjects/subjectSlice';
import resultReducer from '../features/marksEntry/resultSlice';
import resultViewReducer from '../features/result/resultViewSlice';
import meritReducer from '../features/merit/meritSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    exams: examReducer,
    subjects: subjectReducer,
    results: resultReducer,
    resultView: resultViewReducer,
    merit: meritReducer
  }
});

export default store;