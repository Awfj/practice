import styles from './PageMessage.module.css';

export default function PageMessage({ children }) {
    return (
        <p className={styles.message}>
            {children}
        </p>
    )
}