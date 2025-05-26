import { Provider } from "react-redux";
import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import PriceBox from "./components/PriceBox";
import ConfirmModal from "./components/ConfirmModal";
import store from "./store/store";

import { useDispatch, useSelector } from "./hooks/useCustomRedux";
import { clearCart } from "./slices/cartSlice";
import { closeModal } from "./slices/modalSlice";

function AppContent() {
  const isModalOpen = useSelector((state) => state.modal.isConfirmModalOpen);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <>
      <div className={isModalOpen ? "blur-sm transition duration-200" : "transition duration-200"}>
        <Navbar />
        <CartList />
        <PriceBox />
      </div>
      <ConfirmModal onConfirm={handleConfirm} />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
