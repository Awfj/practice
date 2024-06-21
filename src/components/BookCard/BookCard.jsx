import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './BookCard.module.css';
import { getBookDetailsPath } from '../../routes';

export default function BookCard({ book }) {
    return (
        <Link to={getBookDetailsPath(book.id)} className={styles.card}>
            {book.volumeInfo.imageLinks && (
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            )}
            {book.volumeInfo.categories && <p className={styles.category}>{book.volumeInfo.categories.join(', ')}</p>}

            <h2 className={styles.title}>{book.volumeInfo.title}</h2>
            {book.volumeInfo.authors && <p className={styles.author}>{book.volumeInfo.authors.join(', ')}</p>}
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