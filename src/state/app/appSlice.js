import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthModalOpen: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        openAuthModal(state) {
            state.isAuthModalOpen = true;
        },
        closeAuthModal(state) {
            state.isAuthModalOpen = false;
        },
    },
});

export const { openAuthModal, closeAuthModal } = appSlice.actions;
export default appSlice.reducer;