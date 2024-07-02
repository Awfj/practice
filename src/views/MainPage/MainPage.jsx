import { useDispatch, useSelector } from 'react-redux';

import styles from './MainPage.module.css';

import BookList from '@/components/BookList';
import Loading from '@/components/Loading';
import PageMessage from '@/components/PageMessage';
import { Placement } from '@/constants';
import { fetchBooks } from '@/state/books/booksActions';
import { loadMoreBooks } from '@/state/books/booksSlice';

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
                    {total === 0 ? "No books found" : `Found ${total} results. Number of books displayed: ${books.length}`}
                </PageMessage>
            }

            {!loadMore && status === 'loading' && <Loading placement={Placement.TOP} />}

            {status !== 'failed' && (
                <BookList books={books} />
            )}

            {total > 0 && status !== 'failed' &&
                (loadMore && status === 'loading'
                    ? <Loading placement={Placement.BOTTOM} />
                    : <button className={styles.load_more_btn} onClick={handleLoadMore}>Load More</button>
                )
            }
        </div>
    )
}