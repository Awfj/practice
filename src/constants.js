export const BOOKS_TO_LOAD = 30;

export const CATEGORIES = [
    'all',
    'art',
    'biography',
    'computers',
    'history',
    'medical',
    'poetry',
];

export const SORTING = [
    'relevance',
    'newest',
];

const BOOK_BASE = '/book';
export const Paths = {
    HOME: '/',
    BOOK: {
        DETAILS: `${BOOK_BASE}/:id`,
        getDetailsPath: (id) => `${BOOK_BASE}/${id}`,
    },
};