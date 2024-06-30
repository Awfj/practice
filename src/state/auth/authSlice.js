import { signIn, signOut,signUp } from './authActions';

import { createSlice } from '@reduxjs/toolkit';

export const userIsLoggedIn = (state) => state.auth.user !== null;

const initialState = {
    user: null,
    isAuthenticating: false,
    error: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError(state) {
            state.error = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // Cases for sign in
            .addCase(signIn.pending, (state) => {
                state.isAuthenticating = true;
                state.error = '';
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isAuthenticating = false;
                state.user = action.payload;
                state.error = '';
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isAuthenticating = false;
                state.error = action.payload;
            })
            // Cases for sign up
            .addCase(signUp.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticating = false;
                state.error = '';
            })
            .addCase(signUp.pending, (state) => {
                state.isAuthenticating = true;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isAuthenticating = false;
                state.error = action.payload;
            })
            // Cases for sign out
            .addCase(signOut.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticating = false;
                state.error = '';
            })
            .addCase(signOut.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { resetError } = authSlice.actions
export default authSlice.reducer;