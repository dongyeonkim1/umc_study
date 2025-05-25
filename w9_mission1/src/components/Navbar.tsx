import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {

    return <div className="flex justify-between items-center p-4 bg-gray-800
        text-white">
        <h1 className="text-2xl font-semibold">Othani Ahn</h1>
        <div className="flex itmes-center space-x-2">
            <FaShoppingCart className="text-2xl"/>
            <span className="text-xl font-medium">12</span>
        </div>
    </div>
};

export default Navbar;