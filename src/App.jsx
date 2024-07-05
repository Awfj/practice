import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import AuthModal from './components/auth/AuthModal';
import Header from './components/Header';
import LoadingIndicator from './components/LoadingIndicator';
import { restoreAuthState } from './state/auth/authActions';
import { userIsLoggedIn } from './state/auth/authSlice';
import { fetchFavouriteBooks } from './state/books/booksActions';
import BookDetails from './views/BookDetails';
import ErrorPage from './views/ErrorPage';
import FavouriteBooks from './views/FavouriteBooks';
import MainPage from './views/MainPage';
import { Paths } from './constants';

import 'normalize.css/normalize.css';

export default function App() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.books.error);
  const isAuthModalOpen = useSelector((state) => state.app.isAuthModalOpen);
  const favourites = useSelector(state => state.books.favourites);
  const isLoggedIn = useSelector(userIsLoggedIn);

  const [authRestored, setAuthRestored] = useState(false);

  // Restore auth state on app load
  useEffect(() => {
    dispatch(restoreAuthState()).then(() => {
      setAuthRestored(true);
    });
  }, [dispatch]);

  // If user is logged in and favourites are not loaded, fetch them
  useEffect(() => {
    if (isLoggedIn && favourites.length === 0) {
      dispatch(fetchFavouriteBooks());
    }
  }, [isLoggedIn, favourites, dispatch]);

  if (!authRestored) {
    return <LoadingIndicator />;
  }

  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path={Paths.HOME} element={error ? <ErrorPage /> : <MainPage />} />
          <Route path={Paths.BOOK.DETAILS} element={error ? <ErrorPage /> : <BookDetails />} />
          <Route path={Paths.FAVOURITE_BOOKS} element={isLoggedIn ? <FavouriteBooks /> : <Navigate to="/" />} />
        </Routes>
      </main>

      {isAuthModalOpen && <AuthModal />}
    </Router>
  )
}