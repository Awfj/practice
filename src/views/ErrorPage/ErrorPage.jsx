import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import PageContainer from '@/components/PageContainer';
import PageMessage from '@/components/PageMessage';

export default function ErrorPage() {
    const error = useSelector((state) => state.books.error);

    return (
        <PageContainer>
            <PageMessage>{error}</PageMessage>
        </PageContainer>
    )
}

ErrorPage.propTypes = {
    error: PropTypes.string
};