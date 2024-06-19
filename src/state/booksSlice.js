import { createSlice } from '@reduxjs/toolkit';
import { BOOKS_TO_LOAD } from '../constants';
import { fetchBooks, fetchBookById, resetStartIndex } from './actions';
import { CATEGORIES, SORTING } from '../constants';

const initialState = {
    books: [],
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
            .addCase(resetStartIndex, (state) => {
                state.startIndex = 0;
            })
            // Cases for fetching books
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.loadMore) {
                    state.books = state.books.concat(action.payload.items) || [];
                } else {
                    state.books = action.payload.items || [];
                }
                state.loadMore = false;
                state.total = action.payload.totalItems;
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
            });
    }
})

export const { setTitle, setCategory, setSorting, loadMoreBooks, incrementStartIndex } = booksSlice.actions
export default booksSlice.reducer;