import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/requests';

export const createRequest = (data) => axios.post(API_BASE, data);
export const getAllRequests = () => axios.get(API_BASE);
export const getRequestById = (id) => axios.get(`${API_BASE}/${id}`);
export const deleteRequest = (id) => axios.delete(`${API_BASE}/${id}`);
