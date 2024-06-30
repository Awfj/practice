import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import BasicBookInfo from '@/components/BasicBookInfo';
import BookCover from '@/components/BookCover';
import ActionButton from '@/components/buttons/ActionButton';
import FavouriteButton from '@/components/buttons/FavouriteButton';
import { getBookById } from '@/state/books/booksActions';
import { resetSelectedBook } from '@/state/books/booksSlice';
import formatDescriptionToParagraphs from '@/utils/formatDescriptionToParagraphs';
import { userIsLoggedIn } from '@/state/auth/authSlice';

import styles from './BookDetails.module.css';

export default function BookDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    //const storedBook = useSelector(state => selectBookById(state, id));
    const selectedBook = useSelector(state => state.books.selectedBook);
    const favourites = useSelector(state => state.books.favourites);
    const isLoggedIn = useSelector(userIsLoggedIn);

    const goBack = useCallback(() => navigate(-1), [navigate]);

    // Fetch book details from Google Books API
    useEffect(() => {
        if (!selectedBook) {
            dispatch(getBookById(id));
        }
    }, [id, selectedBook, dispatch]);

    // Reset selected book when component unmounts
    useEffect(() => {
        return () => {
            dispatch(resetSelectedBook());
        };
    }, [dispatch]);

    // Scroll to top of the page when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // If book is not found in the store, display book details fetched from the API
    //const book = storedBook || fetchedBook;

    const isBookFavourite = selectedBook
        ? favourites.some(favBook => favBook.id === selectedBook.id)
        : false;

    return (
        <div className={styles.book_details}>
            {selectedBook && (
                <>
                    <div className={styles.cover}>
                        <BookCover book={selectedBook} />
                    </div>

                    <section className={styles.details}>
                        <BasicBookInfo book={selectedBook} styles={styles} />

                        {selectedBook.volumeInfo.description && <div className={styles.description}>
                            {formatDescriptionToParagraphs(selectedBook.volumeInfo.description)}
                        </div>}

                        <div className={styles.buttons}>
                            <ActionButton onClick={goBack}>Back</ActionButton>
                            {isLoggedIn && <FavouriteButton book={selectedBook} isBookFavourite={isBookFavourite} />}
                        </div>
                    </section >
                </>
            )}
        </div>
    )
}