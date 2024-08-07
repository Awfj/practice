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
    FAVOURITE_BOOKS: '/favourite-books',
};

export const Auth = {
    SIGN_IN: "Sign In",
    SIGN_UP: "Sign Up",
};

export const Placement = {
    CENTER: 'center',
    TOP: 'top',
    BOTTOM: 'bottom',
};