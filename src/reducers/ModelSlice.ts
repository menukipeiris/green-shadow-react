import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
};

const ModalSlice = createSlice({
    name: "modal",
    initialState: initialState,
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
    },
});

export const { openModal, closeModal } = ModalSlice.actions;
export default ModalSlice.reducer;