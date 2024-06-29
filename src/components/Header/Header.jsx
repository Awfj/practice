import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogIn, LogOut, BookHeart } from 'lucide-react';
import { Paths } from '../../constants';
import styles from './Header.module.css';
import Search from '../Search';
import ActionButton from '../buttons/ActionButton';
import { signOut } from '../../state/auth/authActions';
import { userIsLoggedIn } from '../../state/auth/authSlice';
import { openAuthModal } from '../../state/app/appSlice';

export default function Header() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(userIsLoggedIn);

    const handleAuthAction = () => {
        if (isLoggedIn) {
            dispatch(signOut());
        } else {
            dispatch(openAuthModal());
        }
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <h1 className={styles.heading}>
                    <Link to={Paths.HOME}>Search for books</Link>
                </h1>

                {isLoggedIn && <Link to={Paths.FAVOURITE_BOOKS}><BookHeart /></Link>}
                <ActionButton onClick={handleAuthAction}>
                    {isLoggedIn ? <LogOut /> : <LogIn />}
                </ActionButton>
            </nav>
            <Search />
        </header>
    )
}