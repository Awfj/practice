import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCategory, setTitle, setSorting } from '../state/booksSlice';
import { fetchBooks, resetStartIndex } from '../state/actions';
import { CATEGORIES, SORTING } from '../constants';
import styles from './Search.module.css';

export default function Search() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const title = useSelector((state) => state.books.title);
    const category = useSelector((state) => state.books.category);
    const sorting = useSelector((state) => state.books.sorting);

    const handleSearch = (e) => {
        e.preventDefault();

        if (title.trim() !== '') {
            dispatch(resetStartIndex());
            dispatch(fetchBooks());
            navigate('/');
        }

    }

    return (
        <form className={styles.search} onSubmit={handleSearch}>
            <div className={styles.input_group}>
                <input
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                    placeholder="Enter book title" />
                <button aria-label="Search Books" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                        <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                    </svg>
                </button>
            </div>

            <div className={styles.select_group}>
                <label>
                    Categories
                    <select
                        name="category"
                        value={category}
                        onChange={(e) => dispatch(setCategory(e.target.value))}>
                        {CATEGORIES.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Sorting by
                    <select
                        name='sorting'
                        value={sorting}
                        onChange={(e) => dispatch(setSorting(e.target.value))}>
                        {SORTING.map((sort) => (
                            <option key={sort} value={sort}>{sort}</option>
                        ))}
                    </select>
                </label>
            </div>
        </form>
    )
}