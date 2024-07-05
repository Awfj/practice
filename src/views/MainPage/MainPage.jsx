import { useDispatch, useSelector } from 'react-redux';

import styles from './MainPage.module.css';

import BookList from '@/components/book/BookList';
import LoadingIndicator from '@/components/LoadingIndicator';
import PageContainer from '@/components/PageContainer';
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
        <PageContainer>
            {(status !== 'loading' || loadMore) &&
                <PageMessage>
                    {total === 0 ? "Use the search bar above to explore a wide range of books!" : `Found ${total} results. Number of books displayed: ${books.length}`}
                </PageMessage>
            }

            {!loadMore && status === 'loading' && <LoadingIndicator placement={Placement.TOP} />}

            {total > 0 && status !== 'failed' && (
                <BookList books={books} />
            )}

            {total > 0 && status !== 'failed' &&
                (loadMore && status === 'loading'
                    ? <LoadingIndicator placement={Placement.BOTTOM} />
                    : <button data-testid="load-more-btn" className={styles.load_more_btn} onClick={handleLoadMore}>Load More</button>
                )
            }
        </PageContainer>
    )
}