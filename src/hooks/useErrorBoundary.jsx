import ErrorPage from '../views/ErrorPage';

export default function useErrorBoundary(Component, error) {
    return error ? <ErrorPage /> : <Component />;
}