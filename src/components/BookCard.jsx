import { Link } from 'react-router-dom';
import styles from './BookCard.module.css';

export default function BookCard({ book }) {
    return (
        <Link to={`/book/${book.id}`} className={styles.card}>
            {book.volumeInfo.imageLinks && (
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            )}
            {book.volumeInfo.categories && <p className={styles.category}>{book.volumeInfo.categories.join(', ')}</p>}
            <h2 className={styles.title}>{book.volumeInfo.title}</h2>
            {book.volumeInfo.authors && <p className={styles.author}>{book.volumeInfo.authors.join(', ')}</p>}
        </Link>
    )
}