import api from '../../../shared/api';

// The real JWT lives in an httpOnly cookie, so we only attach the Authorization
// header when an actual token is present (avoiding invalid 'demo-token' falls).
const authHeaders = (token) => {
  if (token && token !== 'demo-token') {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

const unwrap = (response) => response.data.data ?? response.data;

// @desc    GET /api/classes
export const fetchClasses = async (token) => {
  const response = await api.get('/api/classes', { headers: authHeaders(token) });
  return unwrap(response);
};

// @desc    GET /api/sections?class=X
export const fetchSections = async (token, className) => {
  const params = className ? { class: className } : undefined;
  const response = await api.get('/api/sections', { headers: authHeaders(token), params });
  return unwrap(response);
};

// @desc    GET /api/exams
export const fetchExams = async (token) => {
  const response = await api.get('/api/exams', { headers: authHeaders(token) });
  return unwrap(response);
};

// @desc    GET /api/subjects
export const fetchSubjects = async (token) => {
  const response = await api.get('/api/subjects', { headers: authHeaders(token) });
  return unwrap(response);
};

// @desc    GET /api/students?class=X&section=Y
export const fetchStudents = async (token, { class: className, section }) => {
  const response = await api.get('/api/students', {
    headers: authHeaders(token),
    params: { class: className, section, limit: 500 }
  });
  return unwrap(response);
};

// @desc    POST /api/results/bulk  { exam, subjectId, marks:[{studentId,theoryMarks,practicalMarks}] }
export const submitMarks = async (token, payload) => {
  const response = await api.post('/api/results/bulk', payload, { headers: authHeaders(token) });
  return response.data;
};

// @desc    GET /api/results?exam=X&subjectId=Y
export const fetchResults = async (token, { exam, subjectId }) => {
  const response = await api.get('/api/results', {
    headers: authHeaders(token),
    params: { exam, subjectId }
  });
  return unwrap(response);
};

// @desc    DELETE /api/results?exam=X&subjectId=Y  (Remove marksheet)
export const removeMarks = async (token, { exam, subjectId }) => {
  const response = await api.delete('/api/results', {
    headers: authHeaders(token),
    params: { exam, subjectId }
  });
  return response.data;
};

// @desc    GET /api/report-cards/:studentId?exam=X
export const fetchReportCard = async (token, studentId, exam) => {
  const response = await api.get(`/api/report-cards/${studentId}`, {
    headers: authHeaders(token),
    params: { exam }
  });
  return unwrap(response);
};

// @desc    GET /api/report-cards/pdf/:studentId?exam=X  (Blob download)
export const downloadReportCard = async (token, studentId, exam) => {
  const response = await api.get(`/api/report-cards/pdf/${studentId}`, {
    headers: authHeaders(token),
    params: { exam },
    responseType: 'blob'
  });
  return response.data;
};