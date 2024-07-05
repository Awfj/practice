import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './BookCard.module.css';

import BasicBookInfo from '@/components/book/BasicBookInfo';
import BookCover from '@/components/book/BookCover';
import FavouriteButton from '@/components/buttons/FavouriteButton';
import { Paths } from '@/constants';
import { userIsLoggedIn } from '@/state/auth/authSlice';

export default function BookCard({ book }) {
    const isLoggedIn = useSelector(userIsLoggedIn);
    const favourites = useSelector(state => state.books.favourites);

    const isBookFavourite = book
        ? favourites.some(favBook => favBook.id === book.id)
        : false;

    return (
        <div className={styles.container}>
            <Link to={Paths.BOOK.getDetailsPath(book.id)} className={styles.card}>
                <BookCover book={book} />
                <BasicBookInfo book={book} styles={styles} />
            </Link>
            {isLoggedIn && <FavouriteButton book={book} isBookFavourite={isBookFavourite} />}
        </div>
    )
}

BookCard.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.string.isRequired,
        volumeInfo: PropTypes.shape({
            title: PropTypes.string.isRequired,
            authors: PropTypes.arrayOf(PropTypes.string),
            categories: PropTypes.arrayOf(PropTypes.string),
            imageLinks: PropTypes.shape({
                thumbnail: PropTypes.string,
            }),
        }).isRequired,
    }).isRequired,
};