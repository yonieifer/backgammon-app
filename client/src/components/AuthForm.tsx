import { useState } from "react";

interface AuthFormProps {
    action: "login" | "register";
    sendForm: (
        action: "login" | "register",
        username: string,
        email: string,
        password: string,
    ) => void;
}

function AuthForm({ action, sendForm }: AuthFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                sendForm(action, username, email, password);
            }}
        >
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />
            <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
            />
            <button type="submit">{action}</button>
        </form>
    );
}

export default AuthForm;
