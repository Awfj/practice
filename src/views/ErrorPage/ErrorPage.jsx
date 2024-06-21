import PropTypes from 'prop-types';

export default function ErrorPage({ error }) {
    return (
        <p className='error'>{error}</p>
    )
}

ErrorPage.propTypes = {
    error: PropTypes.string
};