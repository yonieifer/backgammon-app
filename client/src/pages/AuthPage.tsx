import { useState } from "react";
import AuthForm from "../components/AuthForm";
import useAuth from "../hooks/useAuth";

function AuthPage() {
    const [action, setAction] = useState<"login" | "register">("login");
    const { authSubmit, error, isLoading } = useAuth();

    return (
        <>
            <h1>{action === "login" ? "Login" : "Sign-Up"}</h1>
            <AuthForm action={action} sendForm={authSubmit} />
            {error && <h2>{error}</h2>}
            {isLoading && <h2>Loading...</h2>}
            {action === "login" ? (
                <p>You are not registered?</p>
            ) : (
                <p>You already registered?</p>
            )}
            <button
                onClick={() =>
                    setAction(action === "login" ? "register" : "login")
                }
            >
                {action === "login" ? "register" : "login"}
            </button>
        </>
    );
}

export default AuthPage;
