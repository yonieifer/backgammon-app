import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.stat === 401) {
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    },
);

export default api
