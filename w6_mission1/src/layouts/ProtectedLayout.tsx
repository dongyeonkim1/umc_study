import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
    const {accessToken} = useAuth();

    if(!accessToken) {
        return <Navigate to={'/login'}replace />;
    }
    return (
        <div className="min-h-screen flex flex-col text-white-600">
            <Navbar /> 
            <main className="flex-1 mt-10">
                <Outlet />
            </main>
            <Footer />
         </div>
    );
};

export default ProtectedLayout;