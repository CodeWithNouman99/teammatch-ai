import axios from "axios";

// One axios instance for the whole app, so the backend address is written in one place
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Before every request: attach the token, if we have one
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// After every response: if the backend says the token is not valid any more,
// clear it and send the user back to the login page
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes("/auth/login");
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;