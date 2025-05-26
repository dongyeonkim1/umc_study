import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";

const PriceBox = () => {
    const { total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModal());
    };

    const handleInitializeCart = () => {
        dispatch(clearCart());
    };


    return (
        <div className="p-12 flex justify-between">
            <button onClick={handleOpenModal} className="border p-2 rounded-md cursor-pointer bg-gray-800 text-white">장바구니 초기화</button>
            <div>총 가격: {total}₩</div>
        </div>
    )
};

export default PriceBox;
