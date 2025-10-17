import axios from "axios";
import { BACKEND_BASE_URL } from "./config";

const api = axios.create({ baseURL: BACKEND_BASE_URL });

export const getHabits = () => api.get("/api/habits");
export const getHabit = (id) => api.get(`/api/habits/${id}`);
export const createHabit = (payload) => api.post("/api/habits", payload);
export const updateHabit = (id, payload) => api.put(`/api/habits/${id}`, payload);
export const deleteHabit = (id) => api.delete(`/api/habits/${id}`);
export const markProgress = (id) => api.post(`/api/habits/${id}/progress`);

export const fetchRandomQuote = () => api.get("/api/quotes/random");

export default api;


