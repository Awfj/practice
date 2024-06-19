import { createSlice } from '@reduxjs/toolkit';
import { BOOKS_TO_LOAD } from '../constants';
import { fetchBooks, fetchBookById, resetStartIndex } from './actions';

const initialState = {
    books: [],
    status: 'idle',
    total: 0,
    term: 'js',
    category: 'all',
    sorting: 'relevance',
    startIndex: 0,
    loadMore: false,
    fetchedBook: null,
    error: null
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
        setTerm: (state, action) => {
            state.term = action.payload;
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
                state.loadMoreClicked = false;
                state.total = action.payload.totalItems;
                state.error = null;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(resetStartIndex, (state) => {
                state.startIndex = 0;
            })
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

export const { setTerm, setCategory, setSorting, loadMoreBooks, incrementStartIndex } = booksSlice.actions
export default booksSlice.reducer;