import BookCard from './BookCard';
import { useDispatch, useSelector } from 'react-redux';
import { loadMoreBooks, fetchBooks, incrementStartIndex } from '../state/booksSlice';
import styles from './BookList.module.css';

export default function BookList() {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);
    const total = useSelector((state) => state.books.total);
    const status = useSelector((state) => state.books.status);

    const handleLoadMore = () => {
        dispatch(loadMoreBooks());
        dispatch(incrementStartIndex());
        dispatch(fetchBooks());
    };

    return (
        <>
            <p className={styles.count}>{total === 0 ? "No books" : `Found ${total} results`}</p>

            {status === 'loading' && <div className={styles.loading}>Loading...</div>}
            {status === 'succeeded' && (
                <div className={styles.book_list}>
                    {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}
            {status === 'failed' && <div>Error loading books.</div>}
            {total > 0 && status === 'succeeded' && <button className={styles.load_more_btn} onClick={handleLoadMore}>Load More</button>}
        </>
    )
}