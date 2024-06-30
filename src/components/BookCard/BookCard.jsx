import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BasicBookInfo from '../BasicBookInfo';
import BookCover from '../BookCover/BookCover';

import styles from './BookCard.module.css';

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