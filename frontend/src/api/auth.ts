import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/auth";

// user registration
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
}) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// user login
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data; // jwt token
};
