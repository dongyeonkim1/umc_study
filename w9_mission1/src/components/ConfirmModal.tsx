import { useCartActions } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";

const ConfirmModal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const { clearCart } = useCartActions();

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/30">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="mb-4 text-lg">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded"
            onClick={handleCancel}
          >
            아니오
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleConfirm}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
