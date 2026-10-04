import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function ProtectedRoute() {
    const token = useAuthStore().token;
    if (!token) return <Navigate to="/auth" />;
    return <Outlet />;
}

export default ProtectedRoute;
