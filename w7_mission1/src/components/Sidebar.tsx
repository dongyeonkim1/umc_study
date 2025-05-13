import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import { deleteUser } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { createPortal } from "react-dom";


interface SidebarProps {
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ setSidebarOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const {logout} = useAuth();
  const { accessToken } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleClickWithdraw = () => {
    if (!accessToken) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser();
      await logout();
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (error) {
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  return (
    <aside className="w-40 bg-zinc-900 p-4 space-y-4 absolute md:relative z-20 transition-transform duration-300 ease-in-out transform translate-x-0">
      <button className="block text-left">찾기</button>

      <button
        className="block text-left"
        onClick={() => navigate("/my")}
      >
        마이페이지
      </button>

      <div className="mt-20 text-center">
        <button
          className="text-sm text-gray-400 mt-70"
          onClick={handleClickWithdraw}
        >
          탈퇴하기
        </button>
      </div>

      {accessToken && showModal && createPortal(
        <DeleteModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
        />,
        document.body
      )}
    </aside>
  );
};

export default Sidebar;
