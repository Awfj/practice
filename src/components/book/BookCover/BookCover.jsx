import PropTypes from 'prop-types';

import noImage from '@/assets/no-image.jpg';

export default function BookCover({ book }) {
    return (
        <img
            src={book.volumeInfo.imageLinks?.thumbnail ?? noImage}
            alt={book.volumeInfo.title}
        />
    )
}

BookCover.propTypes = {
    book: PropTypes.shape({
        volumeInfo: PropTypes.shape({
            title: PropTypes.string.isRequired,
            imageLinks: PropTypes.shape({
                thumbnail: PropTypes.string
            })
        }).isRequired
    }).isRequired
};