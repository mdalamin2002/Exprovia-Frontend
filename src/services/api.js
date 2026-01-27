import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  addFavorite: (recipeId) => api.post('/auth/favorites', { recipeId }),
  removeFavorite: (recipeId) => api.delete(`/auth/favorites/${recipeId}`),
};

// Recipe API
export const recipeAPI = {
  getAll: (params) => api.get('/recipes', { params }),
  getById: (id) => api.get(`/recipes/${id}`),
  create: (recipeData) => api.post('/recipes', recipeData),
  update: (id, recipeData) => api.put(`/recipes/${id}`, recipeData),
  delete: (id) => api.delete(`/recipes/${id}`),
  getFeatured: () => api.get('/recipes/featured'),
  getTop: () => api.get('/recipes/top'),
  getByCategory: (category) => api.get(`/recipes/category/${category}`),
  getByCuisine: (cuisine) => api.get(`/recipes/cuisine/${cuisine}`),
  searchByIngredients: (ingredients) => api.get('/recipes/search/ingredients', { params: { ingredients } }),
};

// Category API
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (categoryData) => api.post('/categories', categoryData),
  update: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  delete: (id) => api.delete(`/categories/${id}`),
};

// Review API
export const reviewAPI = {
  getByRecipe: (recipeId) => api.get(`/reviews/recipe/${recipeId}`),
  create: (reviewData) => api.post('/reviews', reviewData),
  update: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  delete: (id) => api.delete(`/reviews/${id}`),
  getAll: () => api.get('/reviews'),
  approve: (id) => api.put(`/reviews/${id}/approve`),
  markHelpful: (id) => api.post(`/reviews/${id}/helpful`),
  markNotHelpful: (id) => api.post(`/reviews/${id}/not-helpful`),
};

// Meal Plan API
export const mealPlanAPI = {
  getAll: (params) => api.get('/meal-plans', { params }),
  getById: (id) => api.get(`/meal-plans/${id}`),
  create: (mealPlanData) => api.post('/meal-plans', mealPlanData),
  update: (id, mealPlanData) => api.put(`/meal-plans/${id}`, mealPlanData),
  delete: (id) => api.delete(`/meal-plans/${id}`),
  markAsCooked: (id) => api.put(`/meal-plans/${id}/cook`),
  getWeekly: (week) => api.get(`/meal-plans/week/${week}`),
  getStats: () => api.get('/meal-plans/stats'),
};

// Recommendation API
export const recommendationAPI = {
  getPersonalized: () => api.get('/recommendations'),
  getTrending: () => api.get('/recommendations/trending'),
  getRandom: () => api.get('/recommendations/random'),
  getByCategory: (category) => api.get(`/recommendations/category/${category}`),
  getByCuisine: (cuisine) => api.get(`/recommendations/cuisine/${cuisine}`),
};

// Grocery List API
export const groceryListAPI = {
  getAll: () => api.get('/grocery-lists'),
  getByWeek: (week) => api.get(`/grocery-lists/${week}`),
  generate: (data) => api.post('/grocery-lists/generate', data),
  addItem: (week, itemData) => api.post(`/grocery-lists/${week}/items`, itemData),
  updateItem: (week, itemId, itemData) => api.put(`/grocery-lists/${week}/items/${itemId}`, itemData),
  removeItem: (week, itemId) => api.delete(`/grocery-lists/${week}/items/${itemId}`),
};

export default api;