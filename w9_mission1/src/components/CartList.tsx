import { useCartInfo } from "../hooks/useCartStore";
import CartItem from "./CartItem";

const CartList = () => {
  const { cartItems } = useCartInfo(); // ✅ Zustand 상태 사용

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
