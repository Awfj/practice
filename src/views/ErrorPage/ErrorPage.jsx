import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function ErrorPage() {
    const error = useSelector((state) => state.books.error);

    return (
        <p className='error'>{error}</p>
    )
}

ErrorPage.propTypes = {
    error: PropTypes.string
};