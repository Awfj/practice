import PropTypes from 'prop-types';

import styles from './TabButton.module.css';

export default function TabButton({ name, activeTab, setActiveTab }) {
    const handleClick = () => {
        setActiveTab(name);
    };

    const buttonClasses = `${styles.tab_button} ${activeTab === name ? styles.tab_active : ''}`;

    return (
        <button onClick={handleClick} className={buttonClasses}>
            {name}
        </button>
    )
}

TabButton.propTypes = {
    name: PropTypes.string.isRequired,
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
};