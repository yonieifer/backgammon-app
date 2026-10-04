import { useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

function useAuth() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const authSubmit = (
        action: "register" | "login",
        username: string,
        email: string,
        password: string,
    ) => {
        setIsLoading(true);
        axios
            .post(import.meta.env.VITE_API_URL + `/${action}`, {
                username,
                email,
                password,
            })
            .then((data) => login(data.data))
            .then(() => navigate(`/${action}`))
            .catch((err: AxiosError) =>
                setError(err.response?.data?.message || err.message),
            )
            .finally(() => setIsLoading(false));
    };

    return { authSubmit, error, isLoading };
}

export default useAuth;
