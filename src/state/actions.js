import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BOOKS_TO_LOAD } from '../constants';

// Fetch books from the Google Books API
export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { getState, rejectWithValue }) => {
    try {
        const { title, sorting, category, startIndex } = getState().books;

        let titlePart = `volumes?q=${title}`;
        let sortingPart = `orderBy=${sorting}`;
        let categoryPart = category === "all" ? "" : `+subject:${category}`;
        let startIndexPart = `startIndex=${startIndex}`;
        let maxResultsPart = `maxResults=${BOOKS_TO_LOAD}`;
        let keyPart = `key=${import.meta.env.VITE_API_KEY}`;

        const response = await axios.get(`https://www.googleapis.com/books/v1/${titlePart}${categoryPart}&${sortingPart}&${startIndexPart}&${maxResultsPart}&${keyPart}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching books: ', error);
        return rejectWithValue('Error fetching books. Please try again later.');
    }
});

// Fetch a single book by its ID
export const fetchBookById = createAsyncThunk('books/fetchBookById', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return rejectWithValue('Error fetching book data. Please try again later.');
    }
});

// Select a book by its ID
export const selectBookById = (state, bookId) =>
    state.books.books.find(book => book.id === bookId);

// Reset the start index to 0 for a new search
export const resetStartIndex = createAction('books/resetStartIndex');