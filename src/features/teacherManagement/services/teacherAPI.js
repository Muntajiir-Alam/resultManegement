import api from '../../../shared/api';

export const createTeacher = async (payload) => {
  const response = await api.post('/api/teacher', {
    name: payload.name,
    accessCode: payload.accessCode,
    role: payload.role
  });
  return response.data;
};

export const fetchTeachers = async (token) => {
  const response = await api.get('/api/teacher');
  return response.data;
};

export const deleteTeacher = async (teacherId, token) => {
  const response = await api.delete(`/api/teacher/${teacherId}`);
  return response.data;
};
