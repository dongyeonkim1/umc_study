import { useCartInfo, useCartActions } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore"; 

const PriceBox = () => {
  const { total } = useCartInfo();
  const { clearCart } = useCartActions();
  const openModal = useModalStore((state) => state.openModal);

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <div className="p-12 flex justify-between">
      <button
        onClick={handleOpenModal}
        className="border p-2 rounded-md cursor-pointer bg-gray-800 text-white"
      >
        장바구니 초기화
      </button>
      <div>총 가격: {total}₩</div>
    </div>
  );
};

export default PriceBox;
