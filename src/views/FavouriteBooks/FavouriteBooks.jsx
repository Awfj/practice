import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BookList from '@/components/book/BookList';
import LoadingIndicator from '@/components/LoadingIndicator';
import PageMessage from '@/components/PageMessage';
import { Placement } from '@/constants';
import { fetchFavouriteBooks } from '@/state/books/booksActions';

export default function Favourites() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.books.status);
    const favourites = useSelector(state => state.books.favourites);

    useEffect(() => {
        if (!favourites.length) {
            dispatch(fetchFavouriteBooks());
        }
    }, [dispatch, favourites.length]);

    function getMessage(count) {
        if (count === 1) {
            return "You have 1 favourite book";
        } else if (count > 1) {
            return `You have ${count} favourite books`;
        }
        return "Nothing here yet"
    }

    return (
        <div>
            {status === 'loading' ? (
                <LoadingIndicator placement={Placement.TOP} />
            ) : (
                <>
                    <PageMessage>{getMessage(favourites.length)}</PageMessage>
                    <BookList books={favourites} />
                </>
            )}
        </div>
    );
}