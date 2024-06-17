import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const BOOKS_TO_LOAD = 4;

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { getState }) => {
    const { term, sorting, category, startIndex } = getState().books;

    let titlePart = `volumes?q=${term}`;
    let sortingPart = `orderBy=${sorting}`;
    let categoryPart = category === "all" ? "" : `+subject:${category}`;
    let startIndexPart = `startIndex=${startIndex}`;
    let maxResultsPart = `maxResults=${BOOKS_TO_LOAD}`;
    let keyPart = `key=${import.meta.env.VITE_API_KEY}`;

    const response = await axios.get(`https://www.googleapis.com/books/v1/${titlePart}${categoryPart}&${sortingPart}&${startIndexPart}&${maxResultsPart}&${keyPart}`);
    return response.data;
});

export const resetStartIndex = createAction('books/resetStartIndex');

export const selectBookById = (state, bookId) =>
    state.books.books.find(book => book.id === bookId);

const initialState = {
    books: [],
    status: 'idle',
    total: 0,
    term: 'react',
    category: 'all',
    sorting: 'relevance',
    startIndex: 0,
    loadMore: false,
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
        }
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
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(resetStartIndex, (state) => {
                state.startIndex = 0;
            });
    }
})

export const { setTerm, setCategory, setSorting, loadMoreBooks, incrementStartIndex } = booksSlice.actions
export default booksSlice.reducer;