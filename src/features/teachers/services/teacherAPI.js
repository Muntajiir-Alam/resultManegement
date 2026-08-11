import api from '../../../shared/api';

export const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`
});

export const createTeacher = async (payload, token) => {
  const response = await api.post('/api/teachers', payload, {
    headers: getAuthHeaders(token)
  });
  return response.data;
};

export const fetchTeachers = async (token) => {
  const response = await api.get('/api/teachers', {
    headers: getAuthHeaders(token)
  });
  return response.data;
};

export const deleteTeacher = async (teacherId, token) => {
  const response = await api.delete(`/api/teachers/${teacherId}`, {
    headers: getAuthHeaders(token)
  });
  return response.data;
};
