import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BOOKS_TO_LOAD } from '../constants';

// Fetch books from the Google Books API
export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { getState, rejectWithValue }) => {
    try {
        let { books, title, sorting, category, startIndex, cachedBooks } = getState().books;

        let basePart = import.meta.env.VITE_API_URL;
        let titlePart = `volumes?q=${title}`;
        let sortingPart = `orderBy=${sorting}`;
        let categoryPart = category === "all" ? "" : `+subject:${category}`;
        let maxResultsPart = `maxResults=${BOOKS_TO_LOAD}`;
        let keyPart = `key=${import.meta.env.VITE_API_KEY}`;

        let storedBooks = new Map(books.map(book => [book.id, book]));
        let remainingBooks = BOOKS_TO_LOAD;
        let fetchedBooks = [...cachedBooks];
        let FETCHED = new Map(fetchedBooks.map(book => [book.id, book]));
        let booksToCache = [];
        let fetchedTotalItems = 0;

        while (remainingBooks > 0) {
            let startIndexPart = `startIndex=${startIndex}`;
            const { data: { items, totalItems } } = await axios.get(`${basePart}${titlePart}${categoryPart}&${sortingPart}&${startIndexPart}&${maxResultsPart}&${keyPart}`);

            fetchedTotalItems = totalItems;
            startIndex += BOOKS_TO_LOAD;
            let count = items.length;
            let uniqueBooks = new Map();

            // Remove duplicates and if loading more books, remove books already stored
            items.forEach(book => {
                if (!(uniqueBooks.has(book.id) || storedBooks.has(book.id) || FETCHED.has(book.id))) {
                    uniqueBooks.set(book.id, book);
                }
            });

            // Remove books that don't match the selected category
            if (category !== 'all') {
                [...uniqueBooks].forEach(([id, book]) => {
                    const categories = (book.volumeInfo.categories || []).join(" ").toLowerCase();
                    if (!categories.includes(category)) {
                        uniqueBooks.delete(id);
                    }
                });
            }

            if (uniqueBooks.size + cachedBooks.length > remainingBooks) {
                fetchedBooks.push(...Array.from(uniqueBooks.values()).slice(0, remainingBooks - cachedBooks.length));
                booksToCache = Array.from(uniqueBooks.values()).slice(remainingBooks - cachedBooks.length);
            } else {
                fetchedBooks.push(...Array.from(uniqueBooks.values()));
            }

            remainingBooks -= uniqueBooks.size;

            if (count === fetchedBooks.length) {
                break;
            }
        }
        return [fetchedBooks, fetchedTotalItems, startIndex, booksToCache];
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