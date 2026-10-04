import { useState } from "react";
import { AxiosError } from "axios";
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
            .then((res) => {                
                login(res.data.data);
                navigate(`/lobby`);
            })
            .catch((err: AxiosError<ServerError>) => {
                const msg =
                    err.response?.data?.message ||
                    err.response?.data ||
                    err.message;
                if (typeof msg === "string") {
                    setError(msg);
                } else {
                    setError("server internal error");
                    console.log(msg);
                }
            })
            .finally(() => setIsLoading(false));
    };

    return { authSubmit, error, isLoading };
}

export default useAuth;
