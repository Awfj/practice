import { signOut } from '../auth/authActions';

import { addBookToFavourites, fetchBooks, fetchFavouriteBooks, getBookById, removeBookFromFavourites } from './booksActions';

import { BOOKS_TO_LOAD } from '@/constants';
import { CATEGORIES, SORTING } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: [],
    favourites: [],
    cachedBooks: [],
    status: 'idle',
    total: 0,
    title: '',
    category: CATEGORIES[0],
    sorting: SORTING[0],
    startIndex: 0,
    loadMore: false,
    selectedBook: null,
    error: null,
}

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        incrementStartIndex: (state) => {
            state.startIndex += BOOKS_TO_LOAD;
        },
        loadMoreBooks: (state) => {
            state.loadMore = true;
        },
        resetSearchState: (state) => {
            state.books = [];
            state.cachedBooks = [];
            state.total = 0;
            state.startIndex = 0;
            state.loadMore = false;
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setSorting: (state, action) => {
            state.sorting = action.payload;
        },
        resetSelectedBook: (state) => {
            state.selectedBook = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signOut.fulfilled, (state) => {
                state.favourites = [];
            })
            // Cases for fetching books
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                let [data, totalItems, startIndex, booksToCache] = action.payload;
                state.status = 'succeeded';

                if (state.loadMore) {
                    state.books = state.books.concat(data) || [];
                } else {
                    state.books = data || [];
                    state.total = totalItems;
                }

                state.startIndex = startIndex;
                state.cachedBooks = booksToCache;
                state.loadMore = false;
                state.error = null;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Cases for fetching a single book
            .addCase(getBookById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getBookById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedBook = action.payload;
                state.error = null;
            })
            .addCase(getBookById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Cases for adding and removing favourites
            .addCase(addBookToFavourites.fulfilled, (state, action) => {
                state.favourites.push(action.payload);
            })
            .addCase(removeBookFromFavourites.fulfilled, (state, action) => {
                state.favourites = state.favourites.filter(book => book.id !== action.payload);
            })
            // Cases for fetching favourite books
            .addCase(fetchFavouriteBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFavouriteBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.favourites = action.payload;
            })
            .addCase(fetchFavouriteBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export const { setTitle, setCategory, setSorting, loadMoreBooks, incrementStartIndex, resetSearchState, resetSelectedBook } = booksSlice.actions
export default booksSlice.reducer;