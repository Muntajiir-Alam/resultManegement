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

// Session cache for static data (classes, sections, exams, subjects, counts).
// Once fetched, these are served from memory until the page is reloaded so the
// portal never hits the API repeatedly while browsing around.
const cache = new Map();

const withCache = (key, fetcher) => {
  if (cache.has(key)) {
    return Promise.resolve(cache.get(key));
  }
  return fetcher().then((data) => {
    cache.set(key, data);
    return data;
  });
};

// @desc    GET /api/classes
export const fetchClasses = (token) =>
  withCache('classes', async () => {
    const response = await api.get('/api/classes', { headers: authHeaders(token) });
    return unwrap(response);
  });

// @desc    GET /api/sections?class=X
export const fetchSections = (token, className) =>
  withCache(`sections:${className || 'all'}`, async () => {
    const params = className ? { class: className } : undefined;
    const response = await api.get('/api/sections', { headers: authHeaders(token), params });
    return unwrap(response);
  });

// @desc    GET /api/exams
export const fetchExams = (token) =>
  withCache('exams', async () => {
    const response = await api.get('/api/exams', { headers: authHeaders(token) });
    return unwrap(response);
  });

// @desc    GET /api/subjects
export const fetchSubjects = (token) =>
  withCache('subjects', async () => {
    const response = await api.get('/api/subjects', { headers: authHeaders(token) });
    return unwrap(response);
  });

// @desc    GET /api/students?class=X&section=Y (cached per class+section)
export const fetchStudents = (token, { class: className, section }) =>
  withCache(`students:${className}:${section}`, async () => {
    const response = await api.get('/api/students', {
      headers: authHeaders(token),
      params: { class: className, section, limit: 500 }
    });
    return unwrap(response);
  });

// @desc    GET /api/students (total count only, cached)
export const fetchStudentsCount = (token) =>
  withCache('students-count', async () => {
    const response = await api.get('/api/students', {
      headers: authHeaders(token),
      params: { limit: 1 }
    });
    return response.data.total ?? (unwrap(response) || []).length;
  });

// @desc    GET /api/teacher (Admin only, cached) — returns { count, data }
export const fetchTeachersCount = (token) =>
  withCache('teachers-count', async () => {
    const response = await api.get('/api/teacher', { headers: authHeaders(token) });
    return response.data.count ?? (response.data.data?.length ?? 0);
  });

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