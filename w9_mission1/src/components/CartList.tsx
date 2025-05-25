import { useSelector } from "react-redux";
import cartItems from "../constants/cartItems";
import CartItem from "./CartItem";

const CartList = () => {
    const item = useSelector((state) => state.cart);
    console.log(item);

    return (
        <div className="flex flex-col items-center justify-center">
           <ul>{cartItems.map((item) => (
            <CartItem key={item.id} lp={item}/>
           ))}</ul>
        </div>
    )
};

export default CartList;