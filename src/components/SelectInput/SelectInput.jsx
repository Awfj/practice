import PropTypes from 'prop-types';

import styles from './SelectInput.module.css';

export default function SelectInput({ label, name, value, onChange, options }) {
    return (
        <label className={styles.label}>
            {label}
            <select className={styles.select} name={name} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </label>
    )
}

SelectInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
};