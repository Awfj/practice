import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BookList from '../../components/BookList';
import PageMessage from '../../components/PageMessage';
import { fetchFavouriteBooks } from '../../state/books/booksActions';

export default function Favourites() {
    const dispatch = useDispatch();
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
        return "You haven't added any books to your favourites yet";
    }

    console.log("!!")
    return (
        <div>
            <PageMessage>{getMessage(favourites.length)}</PageMessage>
            <BookList books={favourites} />
        </div>
    );
}