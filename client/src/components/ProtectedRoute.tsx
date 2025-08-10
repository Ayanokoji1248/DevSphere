import { Outlet, Navigate } from "react-router-dom";
import userStore from "../store/userStore";
import Loader from "./Loader";

const ProtectedRoute = () => {
    const { user, loading } = userStore();
    if (loading) {
        return <div className="w-full h-full flex justify-center items-center text-white p-5 font-bold">
            <Loader />
        </div>
    }
    if (user) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
