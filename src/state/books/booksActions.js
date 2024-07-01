import axios from 'axios';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';

import { BOOKS_TO_LOAD, CATEGORIES } from '@/constants';
import { db } from '@/firebase/firebaseConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

function constructApiUrl({ title, category, sorting, startIndex }) {
    const basePart = import.meta.env.VITE_API_URL;
    const categoryPart = category === "all" ? "" : `+subject:${category}`;
    const keyPart = `key=${import.meta.env.VITE_API_KEY}`;

    return `${basePart}?q=${title}${categoryPart}&orderBy=${sorting}&startIndex=${startIndex}&maxResults=${BOOKS_TO_LOAD}&${keyPart}`;
}

function filterBooks(items, storedBooks, fetchedBooks, category) {
    const fetchedBooksMap = new Map(fetchedBooks.map(book => [book.id, book]));
    const uniqueBooks = new Map();

    // Remove duplicate books and books with a missing title
    items.forEach(book => {
        if (!book.volumeInfo.title) {
            return;
        }

        if (!(uniqueBooks.has(book.id) || storedBooks.has(book.id) || fetchedBooksMap.has(book.id))) {
            uniqueBooks.set(book.id, book);
        }
    });

    // Remove books that don't match the selected category
    if (category !== CATEGORIES[0]) {
        [...uniqueBooks].forEach(([id, book]) => {
            const categories = (book.volumeInfo.categories || []).join(" ").toLowerCase();
            if (!categories.includes(category)) {
                uniqueBooks.delete(id);
            }
        });
    }
    return uniqueBooks;
}

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { getState, rejectWithValue }) => {
    try {
        const { books, title, sorting, category, cachedBooks } = getState().books;
        const storedBooksMap = new Map(books.map(book => [book.id, book]));
        const fetchedBooks = [...cachedBooks];

        let { startIndex } = getState().books;
        let remainingBooks = BOOKS_TO_LOAD;
        let booksToCache = [];
        let fetchedTotalItems = 0;

        while (remainingBooks > 0) {
            const apiUrl = constructApiUrl({ title, category, sorting, startIndex });
            const { data: { items, totalItems } } = await axios.get(apiUrl);

            const uniqueBooks = filterBooks(items, storedBooksMap, fetchedBooks, category);
            const count = items.length;

            fetchedTotalItems = totalItems;
            startIndex += BOOKS_TO_LOAD;

            // If there are more books than needed, store only the necessary amount and cache the rest
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

export const getBookById = createAsyncThunk('books/getBookById', async (id, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        const existingBook = state.books.books.find(book => book.id === id);

        if (existingBook) {
            return existingBook;
        }
        return await fetchBookById(id);
    } catch (error) {
        console.error('Error fetching data: ', error);
        return rejectWithValue('Error fetching book data. Please try again later.');
    }
});

const fetchBookById = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
    return response.data;
};

export const addBookToFavourites = createAsyncThunk(
    'books/addFavourite',
    async (book, { getState, rejectWithValue }) => {
        try {
            const userId = getState().auth.user.uid;
            const docRef = doc(collection(db, 'users', userId, 'favourites'), book.id);
            await setDoc(docRef, book);
            return book;
        } catch (error) {
            console.error("Failed to add to favourites:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const removeBookFromFavourites = createAsyncThunk(
    'books/removeFavourite',
    async (bookId, { getState }) => {
        const userId = getState().auth.user.uid;
        const docRef = doc(collection(db, 'users', userId, 'favourites'), bookId);
        await deleteDoc(docRef);
        return bookId;
    }
);

export const fetchFavouriteBooks = createAsyncThunk(
    'books/fetchFavourites',
    async (_, { getState, rejectWithValue }) => {
        try {
            const userId = getState().auth.user.uid;
            const querySnapshot = await getDocs(collection(db, 'users', userId, 'favourites'));
            const favourites = [];
            querySnapshot.forEach((doc) => {
                favourites.push(doc.data());
            });
            return favourites;
        } catch (error) {
            console.error("Failed to fetch favourites:", error);
            return rejectWithValue(error.message);
        }
    }
);
