import CartList from "./components/CartList";
import ConfirmModal from "./components/ConfirmModal";
import Navbar from "./components/Navbar";
import PriceBox from "./components/PriceBox";
import { useModalStore } from "./hooks/useModalStore";

function AppContent() {
  const isModalOpen = useModalStore((state) => state.isOpen);

  return (
    <>
      <div className={isModalOpen ? "blur-sm transition duration-200" : "transition duration-200"}>
        <Navbar />
        <CartList />
        <PriceBox />
      </div>
      <ConfirmModal />
    </>
  );
}

export default AppContent;
