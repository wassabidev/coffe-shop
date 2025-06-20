import axios from "axios";
import { store } from "../../app/store";
import { setUser, logout } from "../../features/users/userSlice";
import { API_URL } from "@/api/api";

const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const { token, refreshToken } = store.getState().user;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (refreshToken) {
    config.headers["x-refresh-token"] = refreshToken;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const newToken = response.headers["x-access-token"];
    if (newToken) {
      const { refreshToken } = store.getState().user;
      store.dispatch(setUser({ token: newToken, refreshToken }));
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = store.getState().user.refreshToken;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(`${API_URL}/refresh`, {
          refreshToken,
        });

        const { token, refreshToken: newRefresh } = res.data;
        store.dispatch(setUser({ token, refreshToken: newRefresh }));

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
