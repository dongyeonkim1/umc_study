import {Outlet} from "react-router-dom";
import Navbar from "../component/navbar.tsx";


const RootLayer = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default RootLayer;