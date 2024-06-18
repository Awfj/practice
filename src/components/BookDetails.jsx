import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { selectBookById } from '../state/booksSlice';
import styles from './BookDetails.module.css';

export default function BookDetails() {
    const { id } = useParams();
    const book = useSelector(state => selectBookById(state, id));
    const [bookDetails, setBookDetails] = useState(null);

    useEffect(() => {
        if (!book) {
            fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
                .then(response => response.json())
                .then(data => setBookDetails(data));
        }
    }, [id, book]);

    const displayBook = book || bookDetails;

    return (
        <>
            {displayBook && (
                <div className={styles.book_details}>
                    <div>
                        {displayBook.volumeInfo.imageLinks && (
                            <img className={styles.cover} src={displayBook.volumeInfo.imageLinks.thumbnail} alt={displayBook.volumeInfo.title} />
                        )}
                    </div>

                    <section>
                        {displayBook.volumeInfo.categories && <p className={styles.category}>{displayBook.volumeInfo.categories.join(', ')}</p>}
                        <h2 className={styles.title}>{displayBook.volumeInfo.title}</h2>
                        {displayBook.volumeInfo.authors && <p className={styles.author}>{displayBook.volumeInfo.authors.join(', ')}</p>}
                        <div className={styles.description}>
                            {displayBook.volumeInfo.description.split(/(?<=[.!?])\s+(?=[A-Z])/).map((paragraph, index) => (
                                <p key={index}>{paragraph.trim()}</p>
                            ))}
                        </div>
                        <button className={styles.back_btn}><Link to="/">Back</Link></button>
                    </section >
                </div >
            )
            }
        </>
    )
}