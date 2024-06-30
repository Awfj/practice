import styles from './BookList.module.css';

import BookCard from '@/components/BookCard';

export default function BookList({books}) {
    return (
        <div className={styles.book_list}>
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    )
}