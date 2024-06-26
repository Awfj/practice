import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import authSlice from './auth/authSlice';
import booksSlice from './books/booksSlice';

export const store = configureStore({
    reducer: {
        app: appSlice,
        auth: authSlice,
        books: booksSlice,
    }
});