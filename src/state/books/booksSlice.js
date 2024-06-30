import { BOOKS_TO_LOAD } from '../../constants';
import { CATEGORIES, SORTING } from '../../constants';

import { addBookToFavourites, fetchBookById, fetchBooks, fetchFavouriteBooks,removeBookFromFavourites } from './booksActions';

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
    fetchedBook: null,
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
        setFetchedBook: (state, action) => {
            state.fetchedBook = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
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
            .addCase(fetchBookById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBookById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.fetchedBook = action.payload;
                state.error = null;
            })
            .addCase(fetchBookById.rejected, (state, action) => {
                console.log(action.payload)
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
            // favourites
            .addCase(fetchFavouriteBooks.fulfilled, (state, action) => {
                state.favourites = action.payload;
            })
    }
})

export const { setTitle, setCategory, setSorting, loadMoreBooks, incrementStartIndex, resetSearchState } = booksSlice.actions
export default booksSlice.reducer;