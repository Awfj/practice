import { useDispatch, useSelector } from 'react-redux';
import { loadMoreBooks } from '../../state/booksSlice';
import { fetchBooks } from '../../state/actions';
import styles from './BookList.module.css';
import BookCard from '../../components/BookCard';

export default function BookList() {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);
    const total = useSelector((state) => state.books.total);
    const status = useSelector((state) => state.books.status);
    const loadMore = useSelector((state) => state.books.loadMore);

    const handleLoadMore = () => {
        dispatch(loadMoreBooks());
        dispatch(fetchBooks());
    };

    return (
        <>
            {(status !== 'loading' || loadMore) && <p className={styles.count}>
                {total === 0 ? "No books found." : `Found ${total} results. Number of books displayed: ${books.length}`}</p>}

            {!loadMore && status === 'loading' && <div className={styles.loading_top}>Loading...</div>}
            {status !== 'failed' && (
                <div className={styles.book_list}>
                    {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}

            {total > 0 && status !== 'failed' &&
                (loadMore && status === 'loading'
                    ? <div className={styles.loading_bottom}>Loading...</div>
                    : <button className={styles.load_more_btn} onClick={handleLoadMore}>Load More</button>
                )
            }
        </>
    )
}