import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isConfirmModalOpen: boolean;
}

const initialState: ModalState = {
  isConfirmModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isConfirmModalOpen = true;
    },
    closeModal: (state) => {
      state.isConfirmModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
const modalReducer =  modalSlice.reducer;
export default modalReducer;