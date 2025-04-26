import axios from 'axios';

const api = axios.create({
  baseURL: 'https://studyhub-api-p0q4.onrender.com',
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const studentAPI = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data) => api.patch('/users/me', data),
  getTutors: () => api.get('/tutors'),
  bookTutor: (tutorId, data) => api.post(`/book/${tutorId}`, data),
  getBookings: () => api.get('/bookings'),
  createReview: (tutorId, data) => api.post(`/reviews/${tutorId}`, data),
};