import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById, selectBookById } from '../../state/actions';
import formatDescriptionToParagraphs from '../../utils/formatDescriptionToParagraphs';
import BasicBookInfo from '../../components/BasicBookInfo';
import styles from './BookDetails.module.css';

export default function BookDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const storedBook = useSelector(state => selectBookById(state, id));
    const fetchedBook = useSelector(state => state.books.fetchedBook);

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

    return (
        <>
            {book && (
                <div className={styles.book_details}>
                    <div>
                        {book.volumeInfo.imageLinks && (
                            <img className={styles.cover} src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                        )}
                    </div>

                    <section>
                        <BasicBookInfo book={book} styles={styles} />
                        {book.volumeInfo.description && <div className={styles.description}>
                            {formatDescriptionToParagraphs(book.volumeInfo.description)}
                        </div>}
                        <button className={styles.back_btn} onClick={() => navigate(-1)}>Back</button>
                    </section >
                </div>
            )}
        </>
    )
}