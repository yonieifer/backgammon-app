import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore().token;
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
        if (error.response.status === 401) {
            useAuthStore().logout();
        }
        return Promise.reject(error);
    },
);

export default api
