import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';

import styles from './Search.module.css';

import SelectInput from '@/components/SelectInput';
import { CATEGORIES, Paths,SORTING } from '@/constants';
import { fetchBooks } from '@/state/books/booksActions';
import { resetSearchState,setCategory, setSorting, setTitle } from '@/state/books/booksSlice';

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
                <SelectInput
                    label="Categories"
                    name="category"
                    value={category}
                    onChange={(e) => dispatch(setCategory(e.target.value))}
                    options={CATEGORIES}
                />

                <SelectInput
                    label="Sorting by"
                    name="sorting"
                    value={sorting}
                    onChange={(e) => dispatch(setSorting(e.target.value))}
                    options={SORTING}
                />
            </div>
        </form>
    )
}