import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

// Add a request interceptor
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const logIn = async (formData) => {
  try {
    console.log("Sending login request with data:", formData);
    const response = await API.post("/auth/login", formData);
    console.log("Login response:", response.data);
    return response;
  } catch (error) {
    console.log("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const signUp = async (formData) => {
  try {
    console.log("Sending signup request with data:", formData);
    const response = await API.post("/auth/register", formData);
    console.log("Signup response:", response.data);
    return response;
  } catch (error) {
    console.log("Signup error:", error.response?.data || error.message);
    throw error;
  }
};