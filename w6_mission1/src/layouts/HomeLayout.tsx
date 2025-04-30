import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {

    return (
        <div className="h-dvh w-full flex flex-col text-white-600">
            <Navbar />
            <main className="flex-1 mt-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default HomeLayout;