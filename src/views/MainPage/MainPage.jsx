import { useDispatch, useSelector } from 'react-redux';
import { loadMoreBooks } from '../../state/books/booksSlice';
import { fetchBooks } from '../../state/books/booksActions';
import styles from './MainPage.module.css';
import BookList from '../../components/BookList';
import PageMessage from '../../components/PageMessage';

export default function MainPage() {
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
        <div className={styles.page}>
            {(status !== 'loading' || loadMore) &&
                <PageMessage>
                    {total === 0 ? "No books found." : `Found ${total} results. Number of books displayed: ${books.length}`}
                </PageMessage>
            }

            {!loadMore && status === 'loading' && <div className={styles.loading_top}>Loading...</div>}
            {status !== 'failed' && (
                <BookList books={books} />
            )}

            {total > 0 && status !== 'failed' &&
                (loadMore && status === 'loading'
                    ? <div className={styles.loading_bottom}>Loading...</div>
                    : <button className={styles.load_more_btn} onClick={handleLoadMore}>Load More</button>
                )
            }
        </div>
    )
}