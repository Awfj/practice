import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Paths } from '../../constants';
import styles from './Header.module.css';
import Search from '..//Search';
import Button from '../Button';

export default function Header({ toggleAuthModal }) {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <h1 className={styles.heading}>
                    <Link to={Paths.HOME}>Search for books</Link>
                </h1>

                <Button onClick={toggleAuthModal}>
                    <LogIn />
                </Button>
            </nav>
            <Search />
        </header>
    )
}