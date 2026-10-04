import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    user: { username: string; email: string } | null;
    token: string | null;
    login: ({user, token}:{user: { username: string; email: string }, token: string}) => void;
    logout: () => void;
}

export default create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            login: ({user, token}) => set({ user, token }),
            logout: () => set({ user: null, token: null }),
        }),
        { name: "auth" },
    ),
);
