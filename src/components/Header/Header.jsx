import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookHeart, LogIn, LogOut } from 'lucide-react';

import styles from './Header.module.css';

import ActionButton from '@/components/buttons/ActionButton';
import Search from '@/components/Search';
import { Paths } from '@/constants';
import { openAuthModal } from '@/state/app/appSlice';
import { signOut } from '@/state/auth/authActions';
import { userIsLoggedIn } from '@/state/auth/authSlice';

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

                <div className={styles.auth_actions}>
                    {isLoggedIn && <Link data-testid="favourite-books-link" to={Paths.FAVOURITE_BOOKS}><BookHeart /></Link>}

                    <ActionButton data-testid="auth-btn" onClick={handleAuthAction}>
                        {isLoggedIn ? <LogOut /> : <LogIn />}
                    </ActionButton>
                </div>
            </nav>
            <Search />
        </header>
    )
}