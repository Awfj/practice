export const HOME_PATH = '/';

const BASE_BOOK_PATH = '/book';
export const BOOK_DETAILS_PATH = `${BASE_BOOK_PATH}/:id`;
export const getBookDetailsPath = (id) => `${BASE_BOOK_PATH}/${id}`;