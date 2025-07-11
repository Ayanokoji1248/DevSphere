import { Outlet, Navigate } from "react-router-dom";
import userStore from "../store/userStore";

const ProtectedRoute = () => {
    const { user, loading } = userStore();
    if (loading) {
        return <div className="text-white p-5 font-bold">Loading...</div>
    }
    if (user) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
