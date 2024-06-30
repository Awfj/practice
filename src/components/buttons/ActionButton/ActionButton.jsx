import PropTypes from 'prop-types';

import styles from './ActionButton.module.css';

export default function ActionButton({ children, onClick, type = 'button', disabled = false }) {
    return (
        <button disabled={disabled} type={type} className={styles.btn} onClick={onClick}>
            {children}
        </button>
    )
}

ActionButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
};