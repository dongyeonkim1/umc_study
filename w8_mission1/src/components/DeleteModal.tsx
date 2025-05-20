interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal = ({ onClose, onConfirm }: DeleteModalProps) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative bg-zinc-800 p-6 rounded-lg w-96 text-white text-center shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl"
        >
          ×
        </button>

        <p className="text-lg font-semibold mb-6">정말 탈퇴하시겠습니까?</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            예
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
