import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { closeModal } from "../slices/modalSlice";

interface ConfirmModalProps {
  onConfirm: () => void;
}

const ConfirmModal = ({ onConfirm }: ConfirmModalProps) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isConfirmModalOpen);


 const handleConfirm = () => {
    onConfirm(); 
  };


  const handleCancel = () => {
    dispatch(closeModal());
  };
  
  if (!isOpen) return <></>;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="mb-4 text-lg">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-100 text-black rounded"
            onClick={handleCancel}
          >
            아니오
          </button>
          <button
            className="px-4 py-2 bg-red-400 text-white rounded"
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
