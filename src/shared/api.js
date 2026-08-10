import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export const authentication = {
  // "description": "Login and authentication",
  login : async (data) => {
    try {
      const response = await api.post('/api/auth/login', {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed. Please try again.");
    }
  }
}
export const teachers = {
  // "description": "Teacher access management",
  giveAccess: async (data) => {
    try {
      const response = await api.post('/api/teacher', data, {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to give teacher access. Please try again.");
    }
  },
  getAll: async (token) => {
    try {
      const response = await api.get('/api/teacher', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to get teachers. Please try again.");
    }
  },
  revokeAccess: async (id, token) => {
    try {
      const response = await api.delete(`/api/teacher/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to revoke teacher access. Please try again.");
    }
  }
}

export const students = {
  // "description": "Student management and operations",
  getStudents: async (params, token) => {
    try {
      const response = await api.get('/api/students', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: params
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to get students. Please try again.");
    }
  }
}

export const academic = {
  // "description": "Academic master data",
  getClasses: async (token) => {
    try {
      const response = await api.get('/api/classes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to get classes. Please try again.");
    }
  },
  getSections: async (    token) => {
    try {
      const response = await api.get('/api/sections', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to get sections. Please try again.");
    }
  },
  getSubjects: async (token) => {
    try {
      const response = await api.get('/api/subjects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to get subjects. Please try again.");
    }
  },
  getExams: async (token) => {
    try {
      const response = await api.get('/api/exams', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to get exams. Please try again.");
    }
  }
}

export const results = { 
      getResults: async (params, token) => {
        try {
          const response = await api.get('/api/results', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            params: params
          });
          return response.data;
        } catch (err) {
          throw new Error(err.response?.data?.message || "Failed to get results. Please try again.");
        }
      },
      uploadBulkResults: async (data, token) => {
        try {
          const response = await api.post('/api/results/bulk', data, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          return response.data;
        } catch (err) {
          throw new Error(err.response?.data?.message || "Failed to upload bulk results. Please try again.");
        }
      }
    }

export const reports = {
  downloadReportCard: async (studentId, exam, token) => {
    try {
      const response = await api.get(`/api/report-cards/pdf/${studentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: { exam },
        responseType: 'blob' // Important for downloading files
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to download report card. Please try again.");
    }
  }
}

export default api;