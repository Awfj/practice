import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './BookCard.module.css';

import BasicBookInfo from '@/components/book/BasicBookInfo';
import BookCover from '@/components/book/BookCover';
import { Paths } from '@/constants';

export default function BookCard({ book }) {
    return (
        <Link to={Paths.BOOK.getDetailsPath(book.id)} className={styles.card}>
            <BookCover book={book} />
            <BasicBookInfo book={book} styles={styles} />
        </Link>
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