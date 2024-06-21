import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCategory, setTitle, setSorting, resetSearchState } from '../../state/booksSlice';
import { fetchBooks } from '../../state/actions';
import { CATEGORIES, SORTING, Paths } from '../../constants';
import SearchIcon from "../SearchIcon";
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
            dispatch(resetSearchState());
            dispatch(fetchBooks());
            navigate(Paths.HOME);
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
                    <SearchIcon />
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