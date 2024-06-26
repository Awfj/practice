import styles from './Button.module.css';

export default function Button({ children, onClick, type = 'button' }) {
    return (
        <button type={type} className={styles.btn} onClick={onClick}>
            {children}
        </button>
    )
}