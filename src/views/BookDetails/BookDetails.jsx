import { useCallback,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';

import BasicBookInfo from '../../components/BasicBookInfo';
import BookCover from '../../components/BookCover';
import ActionButton from '../../components/buttons/ActionButton';
import FavouriteButton from '../../components/buttons/FavouriteButton';
import { fetchBookById, selectBookById } from '../../state/books/booksActions';
import formatDescriptionToParagraphs from '../../utils/formatDescriptionToParagraphs';

import styles from './BookDetails.module.css';

export default function BookDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const storedBook = useSelector(state => selectBookById(state, id));
    const fetchedBook = useSelector(state => state.books.fetchedBook);
    const favourites = useSelector(state => state.books.favourites);

    const goBack = useCallback(() => navigate(-1), [navigate]);

    // Fetch book details from Google Books API
    useEffect(() => {
        if (!storedBook) {
            dispatch(fetchBookById(id));
        }
    }, [id, storedBook, dispatch]);

    // Scroll to top of the page when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // If book is not found in the store, display book details fetched from the API
    const book = storedBook || fetchedBook;

    const isBookFavourite = favourites.some(favBook => favBook.id === book.id);

    return (
        <div className={styles.book_details}>
            {book && (
                <>
                    <div className={styles.cover}>
                        <BookCover book={book} />
                    </div>

                    <section className={styles.details}>
                        <BasicBookInfo book={book} styles={styles} />

                        {book.volumeInfo.description && <div className={styles.description}>
                            {formatDescriptionToParagraphs(book.volumeInfo.description)}
                        </div>}

                        <div className={styles.buttons}>
                            <FavouriteButton book={book} isBookfavourite={isBookFavourite} />
                            <ActionButton onClick={goBack}>Back</ActionButton>
                        </div>
                    </section >
                </>
            )}
        </div>
    )
}