import PropTypes from 'prop-types';

import styles from './BookList.module.css';

import BookCard from '@/components/book/BookCard';

export default function BookList({books}) {
    return (
        <div data-testid="book-list" className={styles.book_list}>
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    )
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};