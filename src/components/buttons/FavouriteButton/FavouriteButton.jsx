import { useDispatch } from 'react-redux';
import { Heart } from 'lucide-react';

import styles from './FavouriteButton.module.css';

import ActionButton from '@/components/buttons/ActionButton';
import { addBookToFavourites, removeBookFromFavourites } from '@/state/books/booksActions';

export default function FavouriteButton({ book, isBookFavourite = false }) {
    const dispatch = useDispatch();

    const handleClick = () => {
        isBookFavourite
            ? dispatch(removeBookFromFavourites(book.id))
            : dispatch(addBookToFavourites(book));
    }

    return (
        <ActionButton onClick={handleClick}>
            <Heart className={isBookFavourite ? styles.favourite : ""} />
        </ActionButton>
    );
}