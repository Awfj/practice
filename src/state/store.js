import appSlice from './app/appSlice';
import authSlice from './auth/authSlice';
import booksSlice from './books/booksSlice';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        app: appSlice,
        auth: authSlice,
        books: booksSlice,
    }
});