
import PropTypes from 'prop-types';
export default function BasicBookInfo({ book, styles }) {
    return (
        <>
            {book.volumeInfo.categories && <p className={styles.category}>{book.volumeInfo.categories.join(', ')}</p>}
            <h2 className={styles.title}>{book.volumeInfo.title}</h2>
            {book.volumeInfo.authors && <p className={styles.author}>{book.volumeInfo.authors.join(', ')}</p>}
        </>
    )
}

BasicBookInfo.propTypes = {
    book: PropTypes.shape({
        volumeInfo: PropTypes.shape({
            categories: PropTypes.arrayOf(PropTypes.string),
            title: PropTypes.string.isRequired,
            authors: PropTypes.arrayOf(PropTypes.string),
        }).isRequired,
    }).isRequired,
    styles: PropTypes.object.isRequired,
};