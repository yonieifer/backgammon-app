import { useState } from "react";
import axios, { AxiosError } from "axios";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

interface ServerError {
    success: boolean;
    message: string;
}

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
        api.post(`/${action}`, {
            username,
            email,
            password,
        })
            .then((data) => login(data.data))
            .then(() => navigate(`/lobby`))
            .catch((err: AxiosError<ServerError>) =>
                setError(err.response?.data?.message || err.message),
            )
            .finally(() => setIsLoading(false));
    };

    return { authSubmit, error, isLoading };
}

export default useAuth;
