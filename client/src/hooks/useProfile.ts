import { useState, useEffect } from "react";
import api from "../utils/api";
import type { AxiosError } from "axios";

interface ServerError {
    success: boolean;
    message: string;
}

type User = {
    username: string;
    email: string;
    wins: number;
    losses: number;
    createdAt: string;
    updatedAt: string;
};

function useProfile() {
    const [data, setData] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        api.get("/user-profile")
            .then((res) => setData(res.data.data))
            .catch((err: AxiosError<ServerError>) => {
                const msg =
                    err.response?.data?.message ||
                    err.response?.data ||
                    err.message;
                if (typeof msg === "string") setError(msg);
                else {
                    setError("server internal error");
                    console.log(msg);
                }
            })
            .finally(() => setIsLoading(false));
    }, []);

    return { data, error, isLoading };
}

export default useProfile;
