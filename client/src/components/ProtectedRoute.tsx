import { Outlet, Navigate } from "react-router-dom";
import userStore from "../store/userStore";

const ProtectedRoute = () => {
    const { user } = userStore();

    if (user) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
